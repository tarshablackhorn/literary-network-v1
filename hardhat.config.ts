import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import { config as dotenvConfig } from "dotenv";

// Load .env.local first, then .env (if exists)
dotenvConfig({ path: ".env.local" });
dotenvConfig();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: process.env.BASE_PRIVATE_KEY ? [process.env.BASE_PRIVATE_KEY] : [],
      chainId: 8453,
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: process.env.BASE_PRIVATE_KEY ? [process.env.BASE_PRIVATE_KEY] : [],
      chainId: 84532,
    },
  },
  etherscan: {
    apiKey: process.env.BASESCAN_API_KEY || "",
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};

export default config;
