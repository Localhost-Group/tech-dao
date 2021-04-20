const hre = require("hardhat");

// const abi = require('../shared/abi/')

async function main() {
  await hre.run("compile");
  const [deployer, mentor, student, ...rest] = await hre.ethers.getSigners()

  const TCoin = await hre.ethers.getContractFactory("TCOIN");
  const coin = await TCoin.deploy();
  const coinDeployed = await coin.deployed();


  const registryFactory = await hre.ethers.getContractFactory("ContractsRegistry");
  const registry = await registryFactory.deploy(coinDeployed.address, [coinDeployed.address]);
  await registry.deployed();

  const offersContract = await hre.ethers.getContractFactory("HelpOffersMarket");
  const offers = await offersContract.deploy(registry.address);
  await offers.deployed();

  const provider = hre.ethers.providers.getDefaultProvider()
  const wallet = hre.ethers.Wallet.createRandom().connect(provider)

  console.log('deployer', deployer.address)
  console.log('wallet', wallet.address, '\n\n')

  console.log('coin', coinDeployed.address)
  console.log('registry', registry.address)
  console.log('registr admin', await registry.owner())

  console.log('registr coinAddress', await registry.coinAddress())
  console.log('registr expsAddresses', await registry.expsAddresses())

  const sended = await offers.testSendCoins(mentor.address, student.address)

  const b1 = await coin.balanceOf(mentor.address)
  const b2 = await  coin.balanceOf(student.address)

  console.log('mentor balance', b1.toNumber())
  console.log('student balance', b2.toNumber())
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
