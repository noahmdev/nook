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
  },
})
