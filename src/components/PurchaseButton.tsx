import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { LITERARY_NFT_ADDRESS } from '../config/wagmi'
import { parseEther } from 'viem'
import { base } from 'wagmi/chains'

const LITERARY_NFT_ABI = [
  {
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'purchase',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

interface PurchaseButtonProps {
  tokenId: number
  price: string // e.g. "0.001"
  disabled?: boolean
}

export function PurchaseButton({ tokenId, price, disabled }: PurchaseButtonProps) {
  const { isConnected, chain } = useAccount()
  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract()
  const [userDismissedError, setUserDismissedError] = useState(false)

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handlePurchase = () => {
    setUserDismissedError(false)
    writeContract({
      address: LITERARY_NFT_ADDRESS,
      abi: LITERARY_NFT_ABI,
      functionName: 'purchase',
      args: [BigInt(tokenId), BigInt(1)], // Purchase 1 copy
      value: parseEther(price),
    })
  }

  const isWrongNetwork = isConnected && chain?.id !== base.id

  if (!isConnected) {
    return (
      <button
        disabled
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.05)',
          color: '#f5f5f5',
          fontSize: '0.85rem',
          cursor: 'not-allowed',
          opacity: 0.5,
        }}
      >
        Connect Wallet
      </button>
    )
  }

  if (isWrongNetwork) {
    return (
      <button
        disabled
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255, 179, 92, 0.5)',
          background: 'rgba(255, 179, 92, 0.1)',
          color: '#ffb35c',
          fontSize: '0.85rem',
          cursor: 'not-allowed',
          opacity: 0.7,
        }}
      >
        Wrong Network
      </button>
    )
  }

  if (isSuccess) {
    return (
      <div>
        <button
          disabled
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(92, 255, 177, 0.5)',
            background: 'rgba(92, 255, 177, 0.1)',
            color: '#5cffb1',
            fontSize: '0.85rem',
            cursor: 'default',
          }}
        >
          ✓ Purchased!
        </button>
        <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0', opacity: 0.8 }}>
          Purchase complete! Refresh to see your book.
        </p>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={disabled || isPending || isConfirming}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(92, 255, 177, 0.5)',
          background: isPending || isConfirming ? 'rgba(255,255,255,0.05)' : 'rgba(92, 255, 177, 0.1)',
          color: '#5cffb1',
          fontSize: '0.85rem',
          cursor: disabled || isPending || isConfirming ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {isPending
          ? 'Confirm in wallet...'
          : isConfirming
          ? 'Processing...'
          : `Purchase for ${price} ETH`}
      </button>
      
      {writeError && !userDismissedError && (
        <div
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            background: 'rgba(255, 92, 92, 0.1)',
            border: '1px solid rgba(255, 92, 92, 0.3)',
            fontSize: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <strong style={{ color: '#ff5c5c' }}>Transaction failed</strong>
              <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9 }}>
                Common reasons: Not enough ETH for gas, wrong network, or transaction rejected.
              </p>
            </div>
            <button
              onClick={() => setUserDismissedError(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff5c5c',
                cursor: 'pointer',
                padding: '0',
                marginLeft: '0.5rem',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
