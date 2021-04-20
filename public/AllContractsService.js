import blockchainController from './BlockchainService'
import { AllAddresses, getDepositAddresses } from 'shared/contracts/contractsData';
import Contracts from 'shared/contracts';

// const testContract = null

class AllContracts {
  constructor() {
    this.events = {}; // mapping {address : contract}
    this.teams = {}; // mapping {address : contract}
    this.stock = {}; // mapping {address : contract}
    this.addresses = AllAddresses()
  }

  init = async () => {
    await this.initAllEventsContracts()
    await this.initAllTeamsContracts()
    await this.initAllStockContracts()
  }

  initAllEventsContracts = async () => {
    const { eventsAddresses } = this.addresses
    const promises = eventsAddresses.map(async (address) => { await this._initializeContractForEvent(address) })
    await Promise.all(promises)
 
  }

  initAllTeamsContracts = async () => {
    const { teamsAddresses } = this.addresses
    const promises = teamsAddresses.map(async (address) => { await this._initializeContractForTeam(address) })
    const contracts = await Promise.all(promises)
  }

  _initializeContractForTeam = async (address) => {
    try {
      const contract = await blockchainController.initContracts(
        Contracts.teamToken.abi,
        address,
      );

      // console.log('team contract', address, contract)
      this.teams[address] = contract
    } catch (err) {
      console.error('_initializeContractForTeam address', err)
    }
  };

  _initializeContractForEvent = async (address) => {
    try {
      const contract = await blockchainController.initContracts(
        Contracts.eventToken.abi,
        address,
      );
      // console.log('event contract', address, contract)
      this.events[address] = contract
    } catch (err) {
      console.error('_initializeContractForEvent address', err)
    }
  }

  initAllStockContracts = async () => {
    try {
      const { deposit, buy, sell } = getDepositAddresses()

      const depositContract = await blockchainController.initContracts(
        Contracts.deposit.abi,
        deposit,
      );
      this.stock[deposit] = depositContract

      const buyContract = await blockchainController.initContracts(
        Contracts.buyOrderBook.abi,
        buy,
      );
      this.stock[buy] = buyContract

      const sellContract = await blockchainController.initContracts(
        Contracts.sellOrderBook.abi,
        sell,
      );
      this.stock[sell] = sellContract
    } catch (err) {
      console.error('initAllStockContracts', err)
    }
  }

  getTeamContract = address => this.teams[address]

  getEventContract = address => this.events[address]

  getStockContract = (type = 'deposit') => {
    const address = getDepositAddresses()[type]

    if (!address) {
      throw new Error('incorrect stock contract type')
    }

    return this.stock[address]
  }

  getAvailableAddresses = () => {
    const events = Object.keys(this.events)
    const teams = Object.keys(this.teams)

    return [...events, ...teams]
  }
}

const contracts = new AllContracts()
export default contracts
