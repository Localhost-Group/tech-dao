const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const TEXP = await hre.ethers.getContractFactory("TEXP");
  const coin = await TEXP.deploy('JSXP', 'JSXP');
  const coin2 = await TEXP.deploy('TSXP', 'TSXP');
  await coin.deployed();
  await coin2.deployed();

  console.log("JSXP deployed to:", coin.address);
  console.log("JSXP deployed to:", await coin.symbol());
  console.log("JSXP deployed to:", await coin.name());

  console.log("TSXP deployed to:", coin2.address);
  console.log("TSXP deployed to:", await coin2.symbol());
  console.log("TSXP deployed to:", await coin2.name());

  const [f, teacher, teacher2, student, ...rest] = await hre.ethers.getSigners()
  console.log("teacher, student", teacher.address, student.address);

  await coin.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)

  const balanceTeacher = await coin.balanceOf(teacher.address)
  const balance2Teacher = await coin2.balanceOf(teacher.address)

  console.log("teacher", Number(balanceTeacher), Number(balance2Teacher));

  const balanceStudent = await coin.balanceOf(student.address)

  console.log("student", Number(balanceStudent));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
