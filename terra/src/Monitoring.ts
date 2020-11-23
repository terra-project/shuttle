import Web3 from 'web3';
import {
  LCDClient,
  MnemonicKey,
  AccAddress,
  MsgSend,
  MsgExecuteContract
} from '@terra-money/terra.js';
import { Contract } from 'web3-eth-contract';
import EthContractInfos from './config/EthContractInfos';
import TerraAssetInfos from './config/TerraAssetInfos';
import WrappedTokenAbi from './config/WrappedTokenAbi';
import HDWalletProvider from '@truffle/hdwallet-provider';

const DEV_MNEMONIC = process.env.DEV_MNEMONIC as string;
const TERRA_TXS_LOAD_UNIT = parseInt(process.env.TERRA_TXS_LOAD_UNIT as string);

const ETH_CHAIN_ID = process.env.ETH_CHAIN_ID as string;
const TERRA_CHAIN_ID = process.env.TERRA_CHAIN_ID as string;

const ETH_URL = process.env.ETH_URL as string;
const TERRA_URL = process.env.TERRA_URL as string;

export class Monitoring {
  LCDClient: LCDClient;
  TerraAddress: AccAddress;

  EthContracts: { [asset: string]: Contract };
  TerraAssetMapping: {
    [denom_or_address: string]: string;
  };

  constructor() {
    // Register chain infos
    const provider = new HDWalletProvider(DEV_MNEMONIC, ETH_URL);
    const web3 = new Web3(provider);
    const fromAddress = provider.getAddress();

    this.TerraAddress = new MnemonicKey({ mnemonic: DEV_MNEMONIC }).accAddress;
    this.LCDClient = new LCDClient({
      URL: TERRA_URL,
      chainID: TERRA_CHAIN_ID
    });

    const ethContractInfos = EthContractInfos[ETH_CHAIN_ID];
    const terraAssetInfos = TerraAssetInfos[TERRA_CHAIN_ID];

    this.EthContracts = {};
    this.TerraAssetMapping = {};
    for (const [asset, value] of Object.entries(ethContractInfos)) {
      const contract = new web3.eth.Contract(
        WrappedTokenAbi,
        value.contract_address,
        { from: fromAddress }
      );

      this.EthContracts[asset] = contract;

      // Check terra asset info
      const info = terraAssetInfos[asset];
      if (
        (info.denom === undefined && info.contract_address === undefined) ||
        (info.denom !== undefined && info.contract_address !== undefined)
      )
        throw 'Must provide one of denom and contract_address';

      this.TerraAssetMapping[info.denom || info.contract_address || ''] = asset;
    }
  }

  // load and process a single block
  async load(lastHeight: number): Promise<[number, Array<MonitoringData>]> {
    const latestHeight = parseInt(
      (await this.LCDClient.tendermint.blockInfo()).block.header.height
    );

    // skip when initial start or no new blocks generated
    if (lastHeight === 0 || lastHeight >= latestHeight)
      return [latestHeight, []];

    const targetHeight = lastHeight + 1;
    const limit = TERRA_TXS_LOAD_UNIT;
    const monitoringDatas: Array<MonitoringData> = [];

    let page = 1;
    while (true) {
      const txResult = await this.LCDClient.tx.search({
        'tx.height': targetHeight,
        page,
        limit
      });

      txResult.txs.forEach((tx) => {
        // Skip when tx is failed
        if (tx.code !== undefined) return;

        // Only cares about first message
        const msg = tx.tx.msg[0];
        const msgData = msg.toData();
        const msgType = msgData.type;

        if (msgType === 'bank/MsgSend') {
          const data: MsgSend.Data = msgData as MsgSend.Data;

          // Check a recipient is TerraAddress
          if (data.value.to_address === this.TerraAddress) {
            const blockNumber = tx.height;
            const txHash = tx.txhash;
            const sender = data.value.from_address;
            const to = tx.tx.memo;

            data.value.amount.forEach((coin) => {
              if (coin.denom in this.TerraAssetMapping) {
                const asset = this.TerraAssetMapping[coin.denom];
                const amount = coin.amount;
                monitoringDatas.push({
                  blockNumber,
                  txHash,
                  sender,
                  to,
                  amount,
                  contract: this.EthContracts[asset]
                });
              }
            });
          }
        } else if (msgType === 'wasm/MsgExecuteContract') {
          const data: MsgExecuteContract.Data = msgData as MsgExecuteContract.Data;
          if (data.value.contract in this.TerraAssetMapping) {
            const asset = this.TerraAssetMapping[data.value.contract];
            const executeMsg = JSON.parse(
              Buffer.from(data.value.execute_msg, 'base64').toString()
            );

            // Check the msg is 'transfer'
            if ('transfer' in executeMsg) {
              // Check the recipient is TerraAddress
              const transferMsg = executeMsg['transfer'];
              const recipient = transferMsg['recipient'];
              const amount = transferMsg['amount'];
              if (recipient === this.TerraAddress) {
                const blockNumber = tx.height;
                const txHash = tx.txhash;
                const sender = data.value.sender;
                const to = tx.tx.memo;

                monitoringDatas.push({
                  blockNumber,
                  txHash,
                  sender,
                  to,
                  amount,
                  contract: this.EthContracts[asset]
                });
              }
            }
          }
        }
      });

      if (txResult.page_number >= txResult.page_total) break;
      page = txResult.page_number + 1;
    }

    return [targetHeight, monitoringDatas];
  }
}

export type TerraAssetInfo = {
  contract_address?: string;
  denom?: string;
};

export type MonitoringData = {
  blockNumber: number;
  txHash: string;
  sender: string;
  to: string;
  amount: string;

  // eth side data for relayer
  contract: Contract;
};