// src/data/books.ts

export type BookStatus = 'owned' | 'locked'

export type Book = {
  id: number
  title: string
  author: string
  status: BookStatus
  preview: string
  fullText: string
}

// Import the real sample text from file
import prologueSample from '../content/prologue-sample.txt?raw'

export const books: Book[] = [
  {
    id: 1,
    title: 'The Prologue Archive',
    author: 'Tarsha Blackhorn',
    status: 'owned',
    preview: 'A quiet ledger of stories that refuse to stay buried...',
    fullText: prologueSample,
  },
  {
    id: 2,
    title: 'Ash & Static',
    author: 'Tarsha Blackhorn',
    status: 'locked',
    preview: 'Signals in the dark, waiting for someone brave enough to listen.',
    fullText:
      'Locked book. In the future, this will only unlock when the user owns the onchain token for this title.',
  },
  {
    id: 3,
    title: 'Midnight Ledger',
    author: 'Tarsha Blackhorn',
    status: 'locked',
    preview: 'A record of every promise that was never meant to be kept.',
    fullText:
      'Locked book. Same idea as above—this will be gated by onchain ownership in a later version.',
  },
]
