require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});

const ALCHEMY_API_URL = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;


module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY,]
    },
  },
};
