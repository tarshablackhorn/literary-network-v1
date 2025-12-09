import { useAccount, useReadContract } from 'wagmi'
import { LITERARY_NFT_ADDRESS, TOKEN_IDS } from '../config/wagmi'
import { base } from 'wagmi/chains'

// Minimal ABI for testing - just the functions we need
const TEST_ABI = [
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
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getCurrentPrice',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'currentSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export function ContractTest() {
  const { address, isConnected, chain } = useAccount()

  const contractNotDeployed =
    LITERARY_NFT_ADDRESS === '0x0000000000000000000000000000000000000000'

  // Test reading NFT balance
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useReadContract({
    address: LITERARY_NFT_ADDRESS as `0x${string}`,
    abi: TEST_ABI,
    functionName: 'balanceOf',
    args: address && isConnected ? [address, BigInt(TOKEN_IDS.THE_PROLOGUES)] : undefined,
    query: {
      enabled: !!address && isConnected && !contractNotDeployed,
      refetchInterval: 3000, // Refetch every 3 seconds
    },
  })

  // Test reading current price
  const { data: currentPrice } = useReadContract({
    address: LITERARY_NFT_ADDRESS as `0x${string}`,
    abi: TEST_ABI,
    functionName: 'getCurrentPrice',
    args: [BigInt(TOKEN_IDS.THE_PROLOGUES)],
    query: {
      enabled: !contractNotDeployed,
    },
  })

  // Test reading supply
  const { data: supply } = useReadContract({
    address: LITERARY_NFT_ADDRESS as `0x${string}`,
    abi: TEST_ABI,
    functionName: 'currentSupply',
    args: [BigInt(TOKEN_IDS.THE_PROLOGUES)],
    query: {
      enabled: !contractNotDeployed,
    },
  })

  return (
    <div
      style={{
        border: '2px solid #5cffb1',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginTop: '2rem',
        background: 'rgba(92, 255, 177, 0.05)',
      }}
    >
      <h3 style={{ margin: 0, marginBottom: '1rem', color: '#5cffb1' }}>
        🧪 Contract Integration Test
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Wallet Connection Status */}
        <div>
          <strong>Wallet Connected:</strong>{' '}
          {isConnected ? (
            <span style={{ color: '#5cffb1' }}>✓ Yes</span>
          ) : (
            <span style={{ color: '#ffb35c' }}>✗ No (Connect above)</span>
          )}
        </div>

        {isConnected && (
          <>
            <div>
              <strong>Address:</strong>{' '}
              <code style={{ fontSize: '0.85rem' }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </code>
            </div>

            <div>
              <strong>Network:</strong> {chain?.name || 'Unknown'}{' '}
              {chain?.id === base.id ? (
                <span style={{ color: '#5cffb1' }}>✓ Base Mainnet</span>
              ) : (
                <span style={{ color: '#ffb35c' }}>
                  ⚠ Wrong Network (Switch to Base)
                </span>
              )}
            </div>
          </>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid #5cffb1', opacity: 0.3 }} />

        {/* Contract Status */}
        <div>
          <strong>Contract:</strong>{' '}
          {contractNotDeployed ? (
            <span style={{ color: '#ffb35c' }}>
              ⏳ Not deployed yet (placeholder address)
            </span>
          ) : (
            <span style={{ color: '#5cffb1' }}>✓ Deployed</span>
          )}
        </div>

        {!contractNotDeployed && (
          <>
            <div>
              <strong>Contract Address:</strong>{' '}
              <code style={{ fontSize: '0.85rem' }}>
                {LITERARY_NFT_ADDRESS.slice(0, 6)}...{LITERARY_NFT_ADDRESS.slice(-4)}
              </code>
            </div>

            <hr
              style={{ border: 'none', borderTop: '1px solid #5cffb1', opacity: 0.3 }}
            />

            {/* Book Data (only when contract is deployed) */}
            <div>
              <strong>Your Balance (The Prologues):</strong>{' '}
              {balanceLoading ? (
                'Loading...'
              ) : balanceError ? (
                <span style={{ color: '#ff5c5c' }}>
                  Error: {balanceError.message?.slice(0, 100)}
                </span>
              ) : balance !== undefined ? (
                <span style={{ color: balance > 0 ? '#5cffb1' : '#fff' }}>
                  {balance.toString()} {balance > 0 ? '✓ Owned!' : '(not owned yet)'}
                </span>
              ) : (
                'Waiting...'
              )}
            </div>

            <div>
              <strong>Current Price:</strong>{' '}
              {currentPrice !== undefined
                ? `${Number(currentPrice) / 1e18} ETH`
                : 'Loading...'}
            </div>

            <div>
              <strong>Total Minted:</strong>{' '}
              {supply !== undefined ? supply.toString() : 'Loading...'}
            </div>
          </>
        )}

        {contractNotDeployed && (
          <div
            style={{
              marginTop: '0.5rem',
              padding: '1rem',
              background: 'rgba(255, 179, 92, 0.1)',
              borderRadius: '0.25rem',
              fontSize: '0.9rem',
            }}
          >
            <strong>Next Steps:</strong>
            <ol style={{ margin: '0.5rem 0 0 1.25rem', paddingLeft: 0 }}>
              <li>Set VITE_LITERARY_NFT_ADDRESS in .env.local</li>
              <li>Deploy contract to Base Mainnet</li>
              <li>Update the environment variable with deployed address</li>
              <li>Restart dev server to see contract data!</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
