require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    compilers: [     //编译的solidity版本
      {version: "0.5.0"},
      {version: "0.6.6"},
      {version: "0.8.17"}
    ],
    settings: { 
      optimizer: { //优化设置
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {  //网络配置
    mannet: {
      url: "https://bsc-dataseed3.defibit.io",
      accounts: [process.env.MANNET_PRIVATE_KEY], //账户私钥
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.TEST_PRIVATE_KEY], //账户私钥
    },
  },
  etherscan: { // 区块链浏览器（自动上传源代码使用，私钥key需要去申请）
    // etherscan:
    // bscscan:
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

