import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base, baseSepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Literary Network',
  projectId: '1e29c199baacc42bf14c8cab95de404b',
  chains: [base, baseSepolia],
  ssr: false,
})
