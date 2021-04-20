import Web3 from 'web3';

class BlockchainService {
  constructor() {
    // this.host = 'https://rinkeby.infura.io/Fi6gFcfwLWXX6YUOnke8'
    this.host = 'http://localhost:7545/'

    this.connector = null
    this.connectedUser = null
    this.walletConnected = false
  }

  initWeb3 = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error('You need to install Metamask or another wallet')
    }

    const instance = new Web3(window.ethereum);
    this.connector = instance

    const enabled = await window.ethereum.enable();

    if (enabled) {
      this.walletConnected = true
    }

    await this._checkNetwork()
  }

  initContracts = (abi, address) => {
    if (!this.connector) {
      return new Promise(resolve => setTimeout(() => {
        resolve(this.initContracts(abi, address));
      }, 1000));
    }
    return new this.connector.eth.Contract(abi, address);
  };

  watchingAccount = async (cb) => {
    if (!this.walletConnected) {
      this._nextWatchStep(cb)
    }

    const { connector } = this;

    const address = await this._checkUser()

    const weiBalance = await connector.eth.getBalance(address);
    const ethBalance = connector.utils.fromWei(weiBalance.toString(), 'ether');

    cb({
      address,
      weiBalance,
      ethBalance,
    })

    this._nextWatchStep(cb)
  }

  addTokenToWallet = (tokenContract, tokenData) => {
    return new Promise((resolve, reject) => {
      const provider = this.connector.currentProvider

      // token can have only 6 letters/digits

      tokenData.symbol = tokenData.symbol.slice(0, 6)

      provider.sendAsync({
        method: 'metamask_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenContract._address,
            ...tokenData,
          },
        },
        id: tokenContract._id,
      }, (err, added) => {
        if (err || 'error' in added) {
          reject(err)
        }
        resolve(added)
      })
    })
  }

  _nextWatchStep = (cb) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.watchingAccount(cb);
    }, 5000);
  }

  _checkUser = async () => {
    if (!this.connector) {
      return null
    }

    const accounts = await this.connector.eth.getAccounts()
    const [address] = accounts

    if (!this.connectedUser) {
      this.connectedUser = address
    }

    if (address !== this.connectedUser) {
      alert('user changed')
      this.connectedUser = address
    }

    return address
  }

  _checkNetwork = async () => {
    if (!this.connector) {
      return null
    }

    const network = await this.connector.eth.net.getNetworkType()

    if (network !== 'private') {
      throw new Error('This is alpha version of smartbet, please change network to private with address to not lose real money - TODO: aws.someip.com:7545')
    }
  }

}

// "symbol": tokenSymbol,
// "decimals": tokenDecimals,
// "image": tokenImage,
const service = new BlockchainService();
export default service;
