# Literary Network (Base Mainnet)

A minimal Web3 literary dApp for selling and unlocking books on **Base Mainnet**.

## Features

- ⚡️ Vite + React + TypeScript
- 🔗 Wagmi for Web3 integration
- 🌐 Base Mainnet (production)
- 👛 RainbowKit wallet connection
- 📚 NFT-gated book access (ERC-1155)
- 🔄 Network switching with one-click
- ⚠️ Error handling and loading states
- 🎨 Clean, modern UI

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
VITE_LITERARY_NFT_ADDRESS=0xcB8B11587625EA052D309e86fA0F2d525A4f94e4
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

- **Contract**: `0xcB8B11587625EA052D309e86fA0F2d525A4f94e4` (Base Mainnet)
- **Type**: ERC-1155 (LiteraryNFT)
- **Price**: 0.001 ETH per book
- **BaseScan**: https://basescan.org/address/0xcB8B11587625EA052D309e86fA0F2d525A4f94e4

## Documentation

- [Base Mainnet Deployment Guide](./docs/BASE_MAINNET_DEPLOYMENT.md)
- [Contract Verification Guide](./docs/CONTRACT_VERIFICATION.md)
- [Migration Completion Summary](./BASE_MIGRATION_COMPLETE.md)

## License

MIT
