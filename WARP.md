# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
A minimal Web3 application built for Base blockchain with wallet connection capabilities. The app uses Vite + React + TypeScript with Wagmi for Web3 integration.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Vite dev server on port 3000 with auto-open browser.

### Build
```bash
npm run build
```
Compiles TypeScript first, then builds for production. Output goes to `dist/` with sourcemaps enabled.

### Code Quality
```bash
npm run lint              # Run ESLint on .ts and .tsx files
npm run format           # Format code with Prettier
```

### Preview Production Build
```bash
npm run preview
```

## Architecture

### Web3 Configuration
The entire Web3 setup is centralized in `src/config/wagmi.ts`:
- Configures Base and Base Sepolia chains
- Sets up injected wallet and WalletConnect connectors
- WalletConnect Project ID: `1e29c199baacc42bf14c8cab95de404b`

### Application Entry Point
`src/main.tsx` establishes the provider hierarchy:
1. React StrictMode (outermost)
2. WagmiProvider with config
3. QueryClientProvider for React Query
4. App component

### Directory Structure
- `src/config/` - Web3 and application configuration (Wagmi setup lives here)
- `src/components/` - React components (currently empty, ready for UI components)
- `src/hooks/` - Custom React hooks (currently empty, add Web3-related hooks here)
- `src/utils/` - Utility functions (currently empty)

## Code Style

### TypeScript Configuration
- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`
- Target: ES2020 with bundler module resolution
- No emitted files (handled by Vite)

### Prettier Settings
- No semicolons
- Single quotes
- 2-space indentation
- Trailing commas everywhere
- 100 character line width
- Arrow function parens always

### ESLint Configuration
- Uses flat config format (eslint.config.js)
- TypeScript ESLint parser and plugin enabled
- React Hooks rules enforced
- React Refresh rules for HMR compatibility

## Web3 Integration Patterns

### Wagmi Hooks
The app uses Wagmi v2 hooks for Web3 interactions:
- `useAccount()` - Get connected wallet address and connection status
- `useConnect()` - Access connectors and connect wallet
- `useDisconnect()` - Disconnect current wallet

When adding new Web3 functionality, use Wagmi hooks and follow the pattern in `App.tsx`.

## Important Notes
- The app targets Base and Base Sepolia networks only
- All Web3 configuration changes should be made in `src/config/wagmi.ts`
- TypeScript strict mode is enabled - all code must pass strict type checking
- The build process runs TypeScript compiler before Vite build - both must succeed
