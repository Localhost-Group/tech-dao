require("@nomiclabs/hardhat-waffle");
require('@symblox/hardhat-abi-gen');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const url = "https://eth-ropsten.alchemyapi.io/v2/7ar_pnwT1w1TeBuVL4nlVGgiC1V0qhxE";

const privateKey = '1f700e747ec63848f955365f9b42b413042d498af28ce625f8532bae13ce3d34'
const privateKey2 = '2624866d7d30c430c0b83216f1faf0e8e04c93c7927f8abdefbb9b9b388803ef'
const privateKey3 = '1d538367b779019451664ae5e8d8757b71a5343b9f43247e8ddaa52106e0e4f1'

module.exports = {
  solidity: "0.8.0",
  abiExporter: {
    path: './shared/abi',
    clear: true,
    flat: true,
    only: [':TCOIN$', ':TEXP$', ':HelpOffers$'],
    spacing: 2
  },
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/7ar_pnwT1w1TeBuVL4nlVGgiC1V0qhxE",
      accounts: [`0x${privateKey}`, `0x${privateKey2}`, `0x${privateKey3}`]
    }
  }
};

