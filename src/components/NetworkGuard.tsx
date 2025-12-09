import { useAccount, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'

export function NetworkGuard() {
  const { chain, isConnected } = useAccount()
  const { switchChain, isPending } = useSwitchChain()

  // Only show if connected but on wrong network
  if (!isConnected || chain?.id === base.id) {
    return null
  }

  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1.5rem',
        borderRadius: '0.5rem',
        background: 'rgba(255, 179, 92, 0.1)',
        border: '1px solid rgba(255, 179, 92, 0.3)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ color: '#ffb35c' }}>⚠️ Wrong Network</strong>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
            You're on {chain?.name || 'an unsupported network'}. Switch to Base to purchase books.
          </p>
        </div>
        <button
          onClick={() => switchChain({ chainId: base.id })}
          disabled={isPending}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ffb35c',
            background: 'rgba(255, 179, 92, 0.1)',
            color: '#ffb35c',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
          }}
        >
          {isPending ? 'Switching...' : 'Switch to Base'}
        </button>
      </div>
    </div>
  )
}
