# Literary Network

**[Live App on Base](https://literary-network-v1.vercel.app/)** | **[Base Mini App](https://base.org/apps)**

A Web3 literary dApp for buying and reading books onchain. Own your books forever as NFTs on Base Mainnet.

## Features

- 📚 **NFT-Gated Books** - Purchase books as ERC-1155 NFTs and unlock instant reading access
- 🔗 **Base Native** - Built on Base for low fees and fast transactions
- 👛 **Easy Wallet Connection** - RainbowKit integration with multiple wallet support
- 📱 **Base Mini App** - Featured in the Base app ecosystem
- ⚡️ **Modern Stack** - React + TypeScript + Vite + Wagmi v2
- 🎨 **Clean UI** - Dark theme with smooth reading experience
- 🔄 **Network Switching** - One-click Base network switching
- ⚠️ **Error Handling** - Comprehensive error and loading states

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173` (Vite default)

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Web3**: Wagmi, Viem
- **Chains**: Base Mainnet

## Environment Variables

Create a `.env.local` with:

```
VITE_BASE_MAINNET_RPC=https://mainnet.base.org
VITE_LITERARY_NFT_ADDRESS=0xB2Cf4587E8CD20A54b08400D805b74727C5D488B
```

Use Alchemy/QuickNode for better RPC performance.

## Project Structure

```
src/
├── config/         # Configuration files
│   └── wagmi.ts   # Wagmi & Web3 configuration
├── components/    # React components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Smart Contract

- **Contract**: `0xB2Cf4587E8CD20A54b08400D805b74727C5D488B` (Base Mainnet)
- **Type**: ERC-1155 (LiteraryNFT)
- **Price**: 0.001 ETH per book
- **BaseScan**: https://basescan.org/address/0xB2Cf4587E8CD20A54b08400D805b74727C5D488B#code

## Live App

- **Production URL**: https://literary-network-v1.vercel.app/
- **Base Mini App**: Listed in Base app ecosystem
- **Status**: ✅ Live on Base Mainnet

## Documentation

- [Base Mainnet Deployment Guide](./docs/BASE_MAINNET_DEPLOYMENT.md)
- [Contract Verification Guide](./docs/CONTRACT_VERIFICATION.md)
- [Migration Completion Summary](./BASE_MIGRATION_COMPLETE.md)

## License

MIT
