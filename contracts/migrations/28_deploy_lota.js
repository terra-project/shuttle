const WrappedLOTA = artifacts.require("WrappedLOTA");

const CHAIN_ID = {
    mainnet: 1,
    ropsten: 3,
    kovan: 42,
    bsc: 56,
    bsc_testnet: 97,
    hmy: 1666600000,
    hmy_testnet: 1666700000,
};

module.exports = function (deployer, network) {
    if (network == "mainnet" || network == "ropsten") {
        deployer.deploy(WrappedLOTA, {
            gas: 5000000,
            overwrite: false,
            chainId: CHAIN_ID[network],
        });
    }
};