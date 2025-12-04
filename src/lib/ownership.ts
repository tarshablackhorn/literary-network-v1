// src/lib/ownership.ts

import type { Book } from '../data/books'

// Later, this will use wagmi + viem to read from a contract on Base.
export function userOwnsBook(opts: {
  walletAddress: string | undefined
  book: Book
}): boolean {
  const { walletAddress, book } = opts

  // No wallet connected = no ownership.
  if (!walletAddress) return false

  // TEMP: use the book.status flag only.
  // In v2, this will call a contract like "BookToken.balanceOf".
  return book.status === 'owned'
}
