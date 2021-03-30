const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const TCoin = await hre.ethers.getContractFactory("TCOIN");
  const coin = await TCoin.deploy();
  await coin.deployed();

  const [f, teacher, teacher2, teacher3, student, ...rest] = await hre.ethers.getSigners()

  await coin.earnForLearning(teacher.address)
  const balanceToSend = await coin.balanceOf(teacher.address)

  await coin.earnForLearning(teacher.address)
  await coin.earnForLearning(teacher.address)

  await coin.earnForLearning(teacher2.address)
  await coin.earnForLearning(teacher2.address)

  const balanceTeacher = await coin.balanceOf(teacher.address)
  console.log("teacher", Number(balanceToSend), Number(balanceTeacher));

  await coin.spend(teacher.address, teacher2.address, balanceToSend)

  const balanceTeacherAfter = await coin.balanceOf(teacher.address)
  const balanceTeacher2After = await coin.balanceOf(teacher2.address)
  const balanceTeacher3After = await coin.balanceOf(teacher3.address)

  console.log("balanceTeacherAfter", Number(balanceTeacherAfter));
  console.log("balanceTeacher2After", Number(balanceTeacher2After));
  console.log("balanceTeacher3After", Number(balanceTeacher3After));

  const minted = await coin.minted()
  console.log("minted", Number(minted), Number(balanceTeacherAfter) + Number(balanceTeacher2After));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
