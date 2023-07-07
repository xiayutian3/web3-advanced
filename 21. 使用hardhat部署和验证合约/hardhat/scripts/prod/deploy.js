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

  const AirdropLock = await hre.ethers.getContractFactory("AirdropLock");
  const _AirdropLock = await AirdropLock.deploy(multSigAddress, tokenAddress, signerAddress);
  await _AirdropLock.deployed();
  console.log("_AirdropLock:  ", _AirdropLock.address);

  try {
    await hre.run("verify:verify", {
      address: _AirdropLock.address,
      constructorArguments: [multSigAddress, tokenAddress, signerAddress]
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
