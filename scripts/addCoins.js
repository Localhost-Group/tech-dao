const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {

    try {
        const [deployer] = await hre.ethers.getSigners()

        const privateKey = '0x1f700e747ec63848f955365f9b42b413042d498af28ce625f8532bae13ce3d34'
        const privateKey2 = '2624866d7d30c430c0b83216f1faf0e8e04c93c7927f8abdefbb9b9b388803ef'

        const provider = new hre.ethers.providers.InfuraProvider('ropsten')
        const TCoinAddress = '0x4EaEEf368A679c07F214d63F45B727E152D5e22F'
        const abi = fs.readFileSync(path.resolve() + '/shared/abi/TCOIN.json')

        const wallet = new hre.ethers.Wallet(privateKey, provider)
        const wallet2 = new hre.ethers.Wallet(privateKey2, provider)

        const coin = new hre.ethers.Contract(TCoinAddress, JSON.parse(abi), deployer)
        const connectedContract = coin.connect(wallet)

        await connectedContract.earnForLearning(wallet.address)
        await connectedContract.earnForLearning(wallet2.address)

    }
    catch (err) {
        console.log(err.message)
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
