import { defineStore } from 'pinia'
import type { Article } from '@/types/article.types'
import { initLocalStorage, saveLocalStorage } from '@/composables/useLocalStorage.ts'

export const useStorageStore = defineStore('storage', {
  state: () => {
    return {
      articles: initLocalStorage(),
    }
  },
  actions: {
    saveItem(article: Article): void {
      this.articles.push(article)
      saveLocalStorage(this.articles)
    },
    toggleRead(id: string): void {
      const article = this.articles.find((u) => u.id === id)
      if (article) {
        article.isRead = !article.isRead
        saveLocalStorage(this.articles)
      }
    }
  },
})
