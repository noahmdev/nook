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
      const article = this.articles.find((a) => a.id === id)
      if (article) {
        article.isRead = !article.isRead
        saveLocalStorage(this.articles)
      }
    },
    deleteArticle(id: string): void {
      const index = this.articles.findIndex((a) => a.id === id)
      if (index) {
        this.articles.splice(index, 1)
        saveLocalStorage(this.articles)
      }
    }
  },
})
