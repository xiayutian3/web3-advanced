const hre = require("hardhat")

function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
      continue; 
  }
}

async function main() {
  const [owner] = await hre.ethers.getSigners();
  console.log("owner: ", owner.address);

  const Test = await hre.ethers.getContractFactory("Test");
  const _Test = await Test.deploy("Sky", 28);
  await _Test.deployed();
  console.log("_Test:  ", _Test.address);

  const name = await _Test.name();
  console.log("Name:  ",name);

  const tx = await _Test.changeName("New Sky");
  // 等带交易成功后
  await tx.wait();

  const newName = await _Test.name();
  console.log("New Name:  ",newName);

  // 提交代码到区块浏览器验证
  try {
    await hre.run("verify:verify", {
      address: _Test.address,
      constructorArguments: ["Sky", 28]
    });
  } catch(e) {
    console.log(e)
  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
