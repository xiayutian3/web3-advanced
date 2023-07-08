// npx hardhat run scripts/deploy.js
const hre = require("hardhat");

async function main() {

  const Token721 = await hre.ethers.deployContract("ApeNFT");
  await Token721.waitForDeployment();

  const address = await Token721.getAddress();

  // 2023-07-08  部署了两次，所以有两次地址
  // 0x011290A8aA292d0E1cC2fC5613A6a45cEA464468
  // Token721 Contract Address: 0x8e6783C4071A61aB8621CbB2503D5aFA92034E55
  console.log(`Token721 Contract Address: ${address}`);

    // 提交代码到区块浏览器验证(暂时做不了，自动上传，连接不上，在新版本的情况下 2023-7-8)
    // try {
    //   await hre.run("verify:verify", {
    //     address: address,
    //     constructorArguments: []
    //     // constructorArguments: ["Sky", 28]
    //   });
    // } catch(e) {
    //   console.log(e)
    // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
