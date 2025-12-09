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

// Import the complete book text with all chapters
import prologuesComplete from '../content/the-prologues-complete.txt?raw'

export const books: Book[] = [
  {
    id: 1,
    title: 'The Prologues',
    author: 'La\'Tarsha Blackhorn',
    status: 'owned',
    preview: 'A quiet ledger of stories that refuse to stay buried...',
    fullText: prologuesComplete,
  },
]
