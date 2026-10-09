import type { Article } from '@/types/article.types.ts'

export function initLocalStorage(): Article[] {
  const articles: string | null = localStorage.getItem('articles')

  if (!articles) {
    localStorage.setItem('articles', '[]')
    return []
  }

  return JSON.parse(articles)
}

export function saveLocalStorage(articlesArray: Article[]): void {
  localStorage.setItem('articles', JSON.stringify(articlesArray))
}

export function initDarkmodeToggle() {
  const modeToggle = localStorage.getItem('darkmode')

  if (!modeToggle) {
    localStorage.setItem('darkmode', 'false')
    return false
  }

  return modeToggle === 'true'
}

export function saveThemeLocalStorage(theme: boolean) {
  localStorage.setItem('darkmode', JSON.stringify(theme))
}
