import Contracts from '../AllContractsService';

import EventsHandler from './EventsHandler'
import TeamsHandler from './TeamsHandler'

class BalanceHandler {
  static getAllBalancesForAllTeams = async (userAddress) => {
    try {
      const { teamsAddresses } = Contracts.addresses
      const balances = {}

      const promises = teamsAddresses.map(async (address, i) => {
        const contract = Contracts.getTeamContract(address)
        const teamBalance = await TeamsHandler.getChainData(contract, userAddress)

        balances[address] = teamBalance
        // console.log('teamsAddresses', teamBalance)

        return teamBalance
      })

      await Promise.all(promises)
      return balances
    } catch (err) {
      throw new Error('Probably you are in wrong network, because contracts cannot be initialized')
    }
  }

  static getAllBalancesForEvents = async (userAddress) => {
    try {
      const { eventsAddresses } = Contracts.addresses
      const balances = {}

      const promises = eventsAddresses.map(async (address, i) => {
        // console.log('eventBalance', address)

        const contract = Contracts.getEventContract(address)
        const eventBalance = await EventsHandler.getChainData(contract, userAddress)
        // console.log('eventBalance', eventBalance)

        balances[address] = eventBalance

        return eventBalance
      })

      await Promise.all(promises)
      return balances
    } catch (err) {
      throw new Error('Probably you are in wrong network, because contracts cannot be initialized')
    }
  }
}

export default BalanceHandler
