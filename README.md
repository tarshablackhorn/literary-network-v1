# Base Mini App

A minimal Web3 application built for Base blockchain with wallet connection capabilities.

## Features

- ⚡️ Vite + React + TypeScript
- 🔗 Wagmi for Web3 integration
- 🌐 Base and Base Sepolia network support
- 👛 WalletConnect integration
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

The app will open at `http://localhost:3000`

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
- **Chains**: Base, Base Sepolia

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

## License

MIT
