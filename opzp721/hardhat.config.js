require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {  //优化设置
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "sepolia",
  networks: {  //网络配置
    mannet: {
      url: "https://mainnet.infura.io/v3/",
      accounts: [process.env.MANNET_PRIVATE_KEY], //账户私钥
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/BUNtIOpE8iIKNKysyl3jb35r-Phl7ki2`,
      accounts: [process.env.TEST_PRIVATE_KEY], //账户私钥
    },
  },
  etherscan: { // 区块链浏览器（自动上传源代码使用，私钥key需要去申请）
    // etherscan:
    // bscscan:
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
