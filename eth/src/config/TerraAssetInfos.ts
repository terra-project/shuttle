const assetInfos: {
  [network: string]: {
    [asset: string]: {
      is_eth_asset?: boolean;
      contract_address?: string;
      denom?: string;
    };
  };
} = {
  'tequila-0004': {
    LUNA: {
      denom: 'uluna',
    },
    UST: {
      denom: 'uusd',
    },
    KRT: {
      denom: 'ukrw',
    },
    SDT: {
      denom: 'usdr',
    },
    MNT: {
      denom: 'umnt',
    },
    MIR: {
      contract_address: 'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u',
    },
    mAAPL: {
      contract_address: 'terra16vfxm98rxlc8erj4g0sj5932dvylgmdufnugk0',
    },
    mGOOGL: {
      contract_address: 'terra1qg9ugndl25567u03jrr79xur2yk9d632fke3h2',
    },
    mTSLA: {
      contract_address: 'terra1nslem9lgwx53rvgqwd8hgq7pepsry6yr3wsen4',
    },
    mNFLX: {
      contract_address: 'terra1djnlav60utj06kk9dl7defsv8xql5qpryzvm3h',
    },
    mQQQ: {
      contract_address: 'terra18yx7ff8knc98p07pdkhm3u36wufaeacv47fuha',
    },
    mTWTR: {
      contract_address: 'terra1ax7mhqahj6vcqnnl675nqq2g9wghzuecy923vy',
    },
    mMSFT: {
      contract_address: 'terra12s2h8vlztjwu440khpc0063p34vm7nhu25w4p9',
    },
    mAMZN: {
      contract_address: 'terra12saaecsqwxj04fn0jsv4jmdyp6gylptf5tksge',
    },
    mBABA: {
      contract_address: 'terra15dr4ah3kha68kam7a907pje9w6z2lpjpnrkd06',
    },
    mIAU: {
      contract_address: 'terra19dl29dpykvzej8rg86mjqg8h63s9cqvkknpclr',
    },
    mSLV: {
      contract_address: 'terra1fdkfhgk433tar72t4edh6p6y9rmjulzc83ljuw',
    },
    mUSO: {
      contract_address: 'terra1fucmfp8x4mpzsydjaxyv26hrkdg4vpdzdvf647',
    },
    mVIXY: {
      contract_address: 'terra1z0k7nx0vl85hwpv3e3hu2cyfkwq07fl7nqchvd',
    },
    mFB: {
      contract_address: 'terra14gq9wj0tt6vu0m4ec2tkkv4ln3qrtl58lgdl2c',
    },
    aUST: {
      contract_address: 'terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl',
    },
    ANC: {
      contract_address: 'terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc',
    },
    mCOIN: {
      contract_address: 'terra1qre9crlfnulcg0m68qqywqqstplgvrzywsg3am',
    },
    vETH: {
      contract_address: 'terra10wtgtg7m22e9hpyhqmfj7zvapnp2uv5m44x375',
      is_eth_asset: true,
    },
    bETH: {
      contract_address: 'terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l',
      is_eth_asset: true,
    },
    LOTA: {
      contract_address: 'terra1v000amr8a59r88p33ec2kk9xqe047g7zzqqaf4',
    },
  },
  'columbus-4': {
    LUNA: {
      denom: 'uluna',
    },
    UST: {
      denom: 'uusd',
    },
    KRT: {
      denom: 'ukrw',
    },
    SDT: {
      denom: 'usdr',
    },
    MNT: {
      denom: 'umnt',
    },
    MIR: {
      contract_address: 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
    },
    mAAPL: {
      contract_address: 'terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz',
    },
    mGOOGL: {
      contract_address: 'terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt',
    },
    mTSLA: {
      contract_address: 'terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh',
    },
    mNFLX: {
      contract_address: 'terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k',
    },
    mQQQ: {
      contract_address: 'terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp',
    },
    mTWTR: {
      contract_address: 'terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg',
    },
    mMSFT: {
      contract_address: 'terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6',
    },
    mAMZN: {
      contract_address: 'terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2',
    },
    mBABA: {
      contract_address: 'terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa',
    },
    mIAU: {
      contract_address: 'terra15hp9pr8y4qsvqvxf3m4xeptlk7l8h60634gqec',
    },
    mSLV: {
      contract_address: 'terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp',
    },
    mUSO: {
      contract_address: 'terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf',
    },
    mVIXY: {
      contract_address: 'terra1zp3a6q6q4953cz376906g5qfmxnlg77hx3te45',
    },
    mFB: {
      contract_address: 'terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7',
    },
    aUST: {
      contract_address: 'terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu',
    },
    ANC: {
      contract_address: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
    },
    mCOIN: {
      contract_address: 'terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph',
    },
    LOTA: {
      contract_address: 'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr',
    },
  },
};

export default assetInfos;
