const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {

    await hre.run("compile");

    const TCoin = await hre.ethers.getContractFactory("TCOIN");

    const coin = await TCoin.deploy();
    await coin.deployed();

    const TEXP = await hre.ethers.getContractFactory("TEXP");
    const exp1 = await TEXP.deploy('JSXP', 'JSXP');
    const exp2 = await TEXP.deploy('TSXP', 'TSXP');

    await exp1.deployed();
    await exp2.deployed();

    const [student, teacher, ...teachers] = await hre.ethers.getSigners()

    console.log('token', coin.address, await coin.symbol())
    console.log('token', exp1.address, await exp1.symbol())
    console.log('token', exp2.address, await exp2.symbol())

    await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
    await coin.earnForLearning(teacher.address)

    await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
    await coin.earnForLearning(teacher.address)

    await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
    await coin.earnForLearning(teacher.address)

    await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
    await coin.earnForLearning(teacher.address)

    await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
    await coin.earnForLearning(teacher.address)


    const abi = {
        TCOIN: coin.address,
        JSXP: exp1.address,
        TSXP: exp2.address,
    }

    fs.writeFileSync(path.resolve() + '/shared/contracts.json', JSON.stringify(abi))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
