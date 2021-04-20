const hre = require("hardhat");
const fs = require("fs");
const path = require("path");


const techs = [

    {
        name: 'C++XP',
        symbol: 'CPPXP'
    },
    {
        name: 'OBJCXP',
        symbol: 'OBJCXP'
    },
    {
        name: 'CXP',
        symbol: 'CXP'
    },
    {
        name: 'COBOLXP',
        symbol: 'COBOXP'
    },
    {
        name: 'GOXP',
        symbol: 'GOXP'
    },
    {
        name: 'SCALAXP',
        symbol: 'SCALXP'
    },
    {
        name: 'SWIFTXP',
        symbol: 'SWIFXP'
    },
    {
        name: 'ANDROIDXP',
        symbol: 'ANDRXP'
    },

    {
        name: 'HASKELLXP',
        symbol: 'HASKXP'
    },
    {
        name: 'RUSTXP',
        symbol: 'RUSTXP'
    },
    {
        name: 'SOLIDITYXP',
        symbol: 'SOLIXP'
    },

    {
        name: 'C#XP',
        symbol: 'CSXP'
    },
    {
        name: 'JAVAXP',
        symbol: 'JAVAXP'
    },
    {
        name: 'PHPXP',
        symbol: 'PHPXP'
    },
    {
        name: 'PYTHONXP',
        symbol: 'PYTHXP'
    },

    {
        name: 'JSXP',
        symbol: 'JSXP'
    },
    {
        name: 'HTMLXP',
        symbol: 'HTMLXP'
    },
    {
        name: 'CSSXP',
        symbol: 'CSSXP'
    },
]

async function main() {
    try {
        await hre.run("compile");

        const contracts = {
            coin: {},
            exps: {}
        }

        const TechCoin = await hre.ethers.getContractFactory("TCOIN");
        const coin = await TechCoin.deploy();
        await coin.deployed();

        contracts.coin['TDC'] = coin.address

        console.log('TDC', 'deployed')

        const ExpCoin = await hre.ethers.getContractFactory("TEXP");

        for await (const { name, symbol } of techs) {
            const expCoin = await ExpCoin.deploy(name, symbol);
            await expCoin.deployed();

            console.log(name, 'deployed')

            contracts.exps[symbol] = expCoin.address
        }

        fs.writeFileSync(path.resolve() + '/shared/contracts.json', JSON.stringify(contracts))
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
