import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base, baseSepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Literary Network',
  projectId: '1e29c199baacc42bf14c8cab95de404b',
  chains: [baseSepolia, base], // Put Base Sepolia first for testing
  ssr: false,
})

// Contract addresses - update after deployment
export const LITERARY_NFT_ADDRESS = '0x0000000000000000000000000000000000000000' // Replace with deployed address

// Token IDs for each book
export const TOKEN_IDS = {
  THE_PROLOGUES: 1,
  ASH_AND_STATIC: 2,
  MIDNIGHT_LEDGER: 3,
} as const
