require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [
        "4d4cb644958b2d3f51d53eadf568d7539dec9385fde18f67d1579349b7aaf73c",
      ],
    },
  },
};
