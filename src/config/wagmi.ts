import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'
import { http } from 'viem'

// Get contract address from environment variables
export const LITERARY_NFT_ADDRESS = import.meta.env.VITE_LITERARY_NFT_ADDRESS as `0x${string}`

if (!LITERARY_NFT_ADDRESS) {
  throw new Error('VITE_LITERARY_NFT_ADDRESS environment variable is not set')
}

// Base mainnet RPC from environment or fallback to public RPC
const baseMainnetRpc = import.meta.env.VITE_BASE_MAINNET_RPC || 'https://mainnet.base.org'

export const config = getDefaultConfig({
  appName: 'Literary Network',
  projectId: '1e29c199baacc42bf14c8cab95de404b',
  chains: [base], // Base Mainnet only - production ready
  transports: {
    [base.id]: http(baseMainnetRpc),
  },
  ssr: false,
})

// Token IDs for each book
export const TOKEN_IDS = {
  THE_PROLOGUES: 1,
  ASH_AND_STATIC: 2,
  MIDNIGHT_LEDGER: 3,
} as const
