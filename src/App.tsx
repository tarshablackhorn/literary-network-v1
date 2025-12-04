import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { books, Book } from './data/books'
import { useBookOwnership } from './hooks/useBookOwnership'
import { TOKEN_IDS } from './config/wagmi'
import { ContractTest } from './components/ContractTest'

function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  // TODO: Uncomment when contract is deployed and LITERARY_NFT_ADDRESS is set
  // const prologuesOwnership = useBookOwnership(TOKEN_IDS.THE_PROLOGUES)
  // Then use prologuesOwnership.ownsBook to determine if book is accessible

  const handleBookClick = (book: Book) => {
    // TODO: After contract deployment, check NFT ownership instead of book.status
    // For now, using mock data from books.ts (book.status)
    if (book.status === 'locked') {
      return
    }
    setSelectedBook(book)
  }
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem',
        background: '#05060b',
        color: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
            Literary Network
          </h1>
          <p style={{ opacity: 0.7 }}>
            Connect your wallet to view and unlock your books.
          </p>
        </div>
        <ConnectButton />
      </header>

      {/* Library section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          Your Library
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {books.map((book) => {
            const isOwned = book.status === 'owned'

            return (
              <article
                key={book.id}
                onClick={() => handleBookClick(book)}
                style={{
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: isOwned
                    ? 'linear-gradient(135deg, #12131a, #181f36)'
                    : 'linear-gradient(135deg, #0b0c11, #111320)',
                  opacity: isOwned ? 1 : 0.85,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '170px',
                  cursor: isOwned ? 'pointer' : 'not-allowed',
                }}
              >
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{book.title}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    by {book.author}
                  </p>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      opacity: 0.75,
                      marginTop: '0.5rem',
                    }}
                  >
                    {book.preview}
                  </p>
                </div>

                <p
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: isOwned ? '#5cffb1' : '#ffb35c',
                  }}
                >
                  {isOwned ? 'Owned · Tap to read' : 'Locked · Not purchased'}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Contract Integration Test */}
      <ContractTest />

      {/* Reader */}
      <section
        style={{
          borderRadius: '0.75rem',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '2rem',
          background: 'linear-gradient(135deg, #090a10, #111525)',
          minHeight: '180px',
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        {selectedBook ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.75rem',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                  {selectedBook.title}
                </h2>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  by {selectedBook.author}
                </p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: '#f5f5f5',
                  padding: '0.3rem 0.9rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>

            <div
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                opacity: 0.92,
                whiteSpace: 'pre-wrap',
                fontFamily: 'Georgia, Garamond, serif',
                maxWidth: '65ch',
                margin: '0 auto',
              }}
            >
              {selectedBook.fullText}
            </div>
          </>
        ) : (
          <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
            Select an owned book from your library to start reading. Locked
            titles will unlock later when you own them onchain.
          </p>
        )}
      </section>
    </main>
  )
}

export default App
