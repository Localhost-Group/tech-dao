


const hre = require("hardhat");

const contracts = require('../shared/contracts.json')
const abi = require('../shared/abi/TCOIN.json')
// backend

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

const coinAddress = contracts.coin.TDC

// backend
class TDCController {
    contract = null

    _initContract() {
        const provider = new hre.ethers.providers.InfuraProvider('ropsten')
        const coin = new hre.ethers.Contract(coinAddress, abi, provider)

        this.contract = coin
    }
    
    getBalanceForAddress = async (address) => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const balance = (await this.contract.balanceOf(address)).toNumber()
            return balance
        }
        catch (err) {
            return 0
        }
    }

    getMaxSupply = async () => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const maxSupply = (await this.contract.maxSupply()).toNumber()
            return maxSupply
        }
        catch (err) {
            return 0
        }
    }

    getMindedSupply = async () => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const minted = (await this.contract.minted()).toNumber()
            return minted
        }
        catch (err) {
            return 0
        }
    }

    getBurnedSupply = async () => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const burned = (await this.contract.burned()).toNumber()
            return burned
        }
        catch (err) {
            return 0
        }
    }
}


// 
class TDCHandler {
    contract = null
    provider = null

    _initContract() {
        const provider = new hre.ethers.providers.InfuraProvider('ropsten')
        const coin = new hre.ethers.Contract(coinAddress, abi, provider)

        this.contract = coin
    }
    
    getBalanceForAddress = async (address) => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const balance = (await this.contract.balanceOf(address)).toNumber()
            return balance
        }
        catch (err) {
            return 0
        }
    }

    getMaxSupply = async () => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const maxSupply = (await this.contract.maxSupply()).toNumber()
            return maxSupply
        }
        catch (err) {
            return 0
        }
    }

    getMindedSupply = async () => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const minted = (await this.contract.minted()).toNumber()
            return minted
        }
        catch (err) {
            return 0
        }
    }

    getBurnedSupply = async () => {
        if (!this.contract) {
            throw new Error('contract is not initialized')
        }

        try {
            const burned = (await this.contract.burned()).toNumber()
            return burned
        }
        catch (err) {
            return 0
        }
    }
}

async function fns() {

    const userAddress = '0xaDe352Eb7Ab36d669E31E16996D2Ff119B6D9be7'
    const userAddress2 = '0xCBfFDc8767330aaC8a9F44094c3127Aa0Ec5Dba0'
    
    const contract = new TDCController()

    contract._initContract()

    const balance = await contract.getBalanceForAddress(userAddress)
    console.log('balance', balance, 'for', userAddress)

    const maxSupply = await contract.getMaxSupply()
    const minted = await contract.getMindedSupply()
    const burned = await contract.getBurnedSupply()

    console.log('maxSupply', maxSupply)
    console.log('minted', minted)
    console.log('burned', burned)
}

// await coin.earnForLearning(wallet2.address, another.address)

fns()


