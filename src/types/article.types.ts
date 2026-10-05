import type { ArticleCategory } from '@/constants/categoryColors'

export interface Article {
  id: string
  url: string
  title: string
  description: string
  image?: string
  tags?: string[]
  category: ArticleCategory
  isRead: boolean
  dateAdded: string
}

export interface ogMetaData {
  url: string
  title: string
  description: string
  image: string
}

export type mockMetaData = Record<string, ogMetaData>
