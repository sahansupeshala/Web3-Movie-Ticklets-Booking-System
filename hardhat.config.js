require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_SEPOLIA_URL = "https://eth-sepolia.g.alchemy.com/v2/V8VbeuXIGks4glUYQupSV2wKYO7XCG5r";
const PRIVATE_KEY = "Wallet Private Key";
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/2iZ-IiXOIjpkZnLG9_Pe6hXHcUdvOq7l' ,
      accounts: [ '0xadfecdce6c31239d9537a77e57753baf736ff2237d18c72d6a54a8fadd9afc9e'],
    },
  },
};
