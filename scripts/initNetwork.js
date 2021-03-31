const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function testForCoins() {

    await hre.run("compile");

    const decimalsMultiplier = () => 10 ** 2

    const TCoin = await hre.ethers.getContractFactory("TCOIN");

    const coin = await TCoin.deploy();
    await coin.deployed();

    const [deployer, another, next, ...rest] = await hre.ethers.getSigners()

    const provider = hre.ethers.providers.getDefaultProvider()

    const wallet = hre.ethers.Wallet.createRandom()
    const wallet2 = hre.ethers.Wallet.createRandom()

    console.log('token', coin.address, await coin.symbol())
    console.log('wallet', wallet.address)
    console.log('wallet2', wallet2.address)

    await coin.earnForLearning(deployer.address, another.address)
    await coin.earnForLearning(deployer.address, another.address)
    await coin.earnForLearning(deployer.address, another.address)
    await coin.earnForLearning(deployer.address, another.address)

    await coin.earnForLearning(wallet.address, another.address)
    await coin.earnForLearning(wallet.address, another.address)
    await coin.earnForLearning(wallet.address, another.address)
    await coin.earnForLearning(wallet.address, another.address)

    await coin.earnForLearning(wallet2.address, another.address)
    await coin.earnForLearning(wallet2.address, another.address)
    await coin.earnForLearning(wallet2.address, another.address)
    await coin.earnForLearning(wallet2.address, another.address)

    // await coin.earnForLearning(next.address)

    const balance0 = Number(await coin.balanceOf(deployer.address))
    console.log('deployer', balance0)

    const balance = Number(await coin.balanceOf(wallet.address))
    console.log('wallet', balance)

    const balance2 = Number(await coin.balanceOf(wallet2.address))
    console.log('wallet2', balance2)

    const balance3 = Number(await coin.balanceOf(another.address))
    console.log('another', balance3)

    // const balance3 = Number(await coin.balanceOf(next.address))
    // console.log('balance3', balance3)
    console.log('balances', balance + balance2 + balance0 + balance3)


    const connectedCoin = await coin.connect(deployer)

    await connectedCoin.transfer(wallet2.address, 10 * decimalsMultiplier())

    // // await coin._approve(deployer.address, another.address, 10 * decimalsMultiplier())
    // // await coin.transferFrom(deployer.address, another.address, 10 * decimalsMultiplier())

    // // const allowance = Number(await coin.allowance(deployer.address, another.address))
    // // console.log('allowance', allowance)

    const _balance = Number(await coin.balanceOf(deployer.address))
    console.log('balance', _balance)

    const _balance2 = Number(await coin.balanceOf(wallet.address))
    console.log('balance2', _balance2)

    const _balance3 = Number(await coin.balanceOf(wallet2.address))
    console.log('balance3', _balance3)

    const balance4 = Number(await coin.balanceOf(another.address))
    console.log('another', balance4)

    console.log('balances', _balance + _balance2 + _balance3 + balance4)

    const burned = Number(await coin.burned())
    const minted = Number(await coin.minted())
    const supply = Number(await coin.maxSupply())
    console.log('burned', burned)
    console.log('minted', minted)
    console.log('supply', supply)
    console.log('all minted', minted * 100 / (supply - burned))

}


const techs = [
    {
        name:'PHPEXP',
        symbol:'PHPEXP'
    },
    {
        name:'JSEXP',
        symbol:'JSEXP'
    },
]

async function main() {
    try {
        await hre.run("compile");

        const decimalsMultiplier = () => 10 ** 1

        const ExpCoin = await hre.ethers.getContractFactory("TEXP");

        const jsCoin = await ExpCoin.deploy('JSExp', 'JSEXP');
        await jsCoin.deployed();

        const [deployer, another, next, ...rest] = await hre.ethers.getSigners()

        const provider = hre.ethers.providers.getDefaultProvider()

        const wallet = hre.ethers.Wallet.createRandom()
        const wallet2 = hre.ethers.Wallet.createRandom()

        console.log('token', jsCoin.address, await jsCoin.symbol())
        // console.log('wallet', wallet.address)
        // console.log('wallet2', wallet2.address)

        // await coin.earnForLearning(deployer.address, another.address)
        // await coin.earnForLearning(deployer.address, another.address)
        // await coin.earnForLearning(deployer.address, another.address)
        // await coin.earnForLearning(deployer.address, another.address)

        // await coin.earnForLearning(wallet.address, another.address)
        // await coin.earnForLearning(wallet.address, another.address)
        // await coin.earnForLearning(wallet.address, another.address)
        // await coin.earnForLearning(wallet.address, another.address)

        // await coin.earnForLearning(wallet2.address, another.address)
        // await coin.earnForLearning(wallet2.address, another.address)
        // await coin.earnForLearning(wallet2.address, another.address)
        // await coin.earnForLearning(wallet2.address, another.address)

        // // await coin.earnForLearning(next.address)

        // const balance0 = Number(await coin.balanceOf(deployer.address))
        // console.log('deployer', balance0)

        // const balance = Number(await coin.balanceOf(wallet.address))
        // console.log('wallet', balance)

        // const balance2 = Number(await coin.balanceOf(wallet2.address))
        // console.log('wallet2', balance2)

        // const balance3 = Number(await coin.balanceOf(another.address))
        // console.log('another', balance3)

        // // const balance3 = Number(await coin.balanceOf(next.address))
        // // console.log('balance3', balance3)
        // console.log('balances', balance + balance2 + balance0 + balance3)


        // const connectedCoin = await coin.connect(deployer)

        // await connectedCoin.transfer(wallet2.address, 10 * decimalsMultiplier())

        // // // await coin._approve(deployer.address, another.address, 10 * decimalsMultiplier())
        // // // await coin.transferFrom(deployer.address, another.address, 10 * decimalsMultiplier())

        // // // const allowance = Number(await coin.allowance(deployer.address, another.address))
        // // // console.log('allowance', allowance)

        // const _balance = Number(await coin.balanceOf(deployer.address))
        // console.log('balance', _balance)

        // const _balance2 = Number(await coin.balanceOf(wallet.address))
        // console.log('balance2', _balance2)

        // const _balance3 = Number(await coin.balanceOf(wallet2.address))
        // console.log('balance3', _balance3)

        // const balance4 = Number(await coin.balanceOf(another.address))
        // console.log('another', balance4)

        // console.log('balances', _balance + _balance2 + _balance3 + balance4)

        // const burned = Number(await coin.burned())
        // const minted = Number(await coin.minted())
        // const supply = Number(await coin.maxSupply())
        // console.log('burned', burned)
        // console.log('minted', minted)
        // console.log('supply', supply)
        // console.log('all minted', minted * 100 / (supply - burned))


        // // await coin.earnForLearning(deployer.address)
        // await coin.transferFrom(deployer.address, another.address, amountToSend)

        // const balance3 = Number(await coin.balanceOf(deployer.address))
        // console.log('balance3', balance3)

        // await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
        // await coin.earnForLearning(teacher.address)

        // await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
        // await coin.earnForLearning(teacher.address)

        // await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
        // await coin.earnForLearning(teacher.address)

        // await exp1.earnForHelping(teacher.address, 10 * 10 ** 9, student.address)
        // await coin.earnForLearning(teacher.address)


        // const abi = {
        //     TCOIN: coin.address,
        //     // JSXP: exp1.address,
        //     // TSXP: exp2.address,
        // }

        // fs.writeFileSync(path.resolve() + '/shared/contracts.json', JSON.stringify(abi))
    }
    catch (e) {
        console.log(e)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
