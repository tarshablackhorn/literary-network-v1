# Contract Verification on BaseScan

This guide explains how to verify the LiteraryNFT contract on BaseScan.

## Contract Details

- **Contract Address**: `0xcB8B11587625EA052D309e86fA0F2d525A4f94e4`
- **Network**: Base Mainnet (Chain ID: 8453)
- **Contract Name**: `LiteraryNFT`
- **Compiler Version**: `v0.8.20+commit.a1b79de6`
- **License**: MIT

## Method 1: Verify via BaseScan UI (Recommended)

1. Go to [BaseScan](https://basescan.org/address/0xcB8B11587625EA052D309e86fA0F2d525A4f94e4#code)

2. Click **"Verify and Publish"**

3. Select **"Solidity (Single file)"** or **"Solidity (Standard JSON Input)"**

4. Fill in the form:
   - **Compiler Version**: `v0.8.20+commit.a1b79de6`
   - **License**: MIT
   - **Optimization**: Enabled (200 runs - check your Remix settings)

5. Paste the contract source code from `contracts/LiteraryNFT.sol`

6. Add constructor arguments (ABI-encoded):
   - The constructor takes one parameter: `string memory baseURI`
   - Your baseURI: `https://ipfs.io/ipfs/bafybeiewc5v6islzpvvvvpntnzio5tsp4orsntcdewc3muv24si7zmbwgi/`
   
   To encode it, use this tool: https://abi.hashex.org/
   - Type: `string`
   - Value: `https://ipfs.io/ipfs/bafybeiewc5v6islzpvvvvpntnzio5tsp4orsntcdewc3muv24si7zmbwgi/`

## Method 2: Verify via Hardhat (If using local setup)

If you have a Hardhat environment set up:

1. Install the Hardhat Etherscan plugin:
```bash
npm install --save-dev @nomicfoundation/hardhat-verify
```

2. Add BaseScan API key to `.env`:
```
BASESCAN_API_KEY=your_api_key_here
```

Get your API key from: https://basescan.org/myapikey

3. Update `hardhat.config.ts`:
```typescript
import "@nomicfoundation/hardhat-verify"

export default {
  // ... other config
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  }
}
```

4. Run verification:
```bash
npx hardhat verify --network base \
  0xcB8B11587625EA052D309e86fA0F2d525A4f94e4 \
  "https://ipfs.io/ipfs/bafybeiewc5v6islzpvvvvpntnzio5tsp4orsntcdewc3muv24si7zmbwgi/"
```

## Method 3: Verify via Remix (Easiest if you deployed from Remix)

1. In Remix, go to the **"Deploy & Run Transactions"** plugin

2. After deployment, Remix should show a **"Verify on Etherscan"** button

3. Click it and follow the prompts

4. Make sure you select **Base Mainnet** and paste your BaseScan API key

## Verification Success

Once verified, you'll be able to:
- Read contract functions directly on BaseScan
- See human-readable function names in transactions
- Prove the bytecode matches your source code
- Allow users to interact with the contract via BaseScan UI

## Troubleshooting

**"Bytecode does not match"**:
- Make sure you're using the exact same compiler version and optimization settings as when you deployed
- Check that all imported contracts (OpenZeppelin) are the same version
- Verify the constructor arguments are correctly ABI-encoded

**"Already verified"**:
- The contract might already be verified! Check the contract page on BaseScan.

**"Invalid API key"**:
- Get a new API key from BaseScan and make sure it's correctly set in your environment.
