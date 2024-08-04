require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
const { DEV_PRIVATE_KEY, PROD_PRIVATE_KEY, SCROL_SCAN_KEY } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1, //changed 534351 to 1 for test purposes
      forking: {
        url: `https://scroll-sepolia.drpc.org`,
        blockNumber: 5933087,
      },
    },
    scrollSepolia: {
      url: `https://scroll-sepolia.blockpi.network/v1/rpc/public`,
      chainId: 534351,
      accounts: [`${DEV_PRIVATE_KEY}`],
    },
    scroll: {
      url: `https://scroll.drpc.org`,
      chainId: 534352,
      accounts: [`${PROD_PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCROL_SCAN_KEY,
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
}
