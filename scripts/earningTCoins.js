const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const TCoin = await hre.ethers.getContractFactory("TCOIN");
  const coin = await TCoin.deploy();
  await coin.deployed();

  console.log("TCoin deployed to:", coin.address);

  const [f, teacher, teacher2, student, ...rest] = await hre.ethers.getSigners()
  console.log("teacher, student", teacher.address, student.address);

  await coin.earnForLearning(teacher.address)

  const balanceTeacher = await coin.balanceOf(teacher.address)
  console.log("teacher", Number(balanceTeacher));

  await coin.earnForLearning(teacher2.address)

  const balanceStudent = await coin.balanceOf(teacher2.address)
  const minted = await coin.minted()
  const maxSupply = await coin.maxSupply()

  console.log("student", Number(balanceStudent));
  console.log("minted", Number(minted), Number(maxSupply));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
