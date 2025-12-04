import { useReadContract, useAccount } from 'wagmi'
import { LITERARY_NFT_ADDRESS } from '../config/wagmi'

// ERC-1155 balanceOf function ABI
const BALANCE_OF_ABI = [
  {
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * Check if the connected wallet owns a specific book NFT
 * @param tokenId - The token ID of the book (1 = Prologues, 2 = Ash & Static, 3 = Midnight Ledger)
 * @returns boolean - true if user owns at least one copy of the book
 */
export function useBookOwnership(tokenId: number) {
  const { address, isConnected } = useAccount()

  const { data: balance, isLoading } = useReadContract({
    address: LITERARY_NFT_ADDRESS as `0x${string}`,
    abi: BALANCE_OF_ABI,
    functionName: 'balanceOf',
    args: address && isConnected ? [address, BigInt(tokenId)] : undefined,
    query: {
      enabled: !!address && isConnected && LITERARY_NFT_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  })

  // If contract not deployed yet, fall back to mock data from books.ts
  const contractNotDeployed = LITERARY_NFT_ADDRESS === '0x0000000000000000000000000000000000000000'

  return {
    ownsBook: contractNotDeployed ? null : balance ? Number(balance) > 0 : false,
    isLoading: contractNotDeployed ? false : isLoading,
    isConnected,
    contractNotDeployed,
  }
}
