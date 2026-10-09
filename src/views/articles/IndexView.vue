<template>
  <div class="max-w-5xl mx-auto">
    <div class="flex items-baseline justify-between mb-5">
      <p class="text-xs text-muted-foreground">
        {{ matchingArticles.length }}
        articles
      </p>
      <p class="text-xs text-muted-foreground">
        Page {{ numberOfPage === 0 ? '0' : currentPage }} of {{ numberOfPage }}
      </p>
    </div>

    <div
      id="display-cards"
      v-if="store.articles.length !== 0"
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :id="article.id"
        :title="article.title"
        :description="article.description"
        :image="article.image"
        :category="article.category"
        :tags="article.tags"
        :isRead="article.isRead"
        :date="article.dateAdded"
        @toggle-read="toggleArticleRead"
        @delete-card="deleteArticleCard"
      />
    </div>

    <div v-else class="flex items-center justify-center h-auto">
      <p class="text-foreground mx-auto">No article registered</p>
    </div>

    <footer
      v-if="filteredArticles.length !== 0"
      class="flex items-center justify-center gap-1.5 py-10"
    >
      <PaginationButton
        direction="previous"
        @click="currentPage = Math.max(1, currentPage - 1)"
        :disabled="currentPage === 1"
        class="disabled:opacity-30"
      />
      <PaginationPageButton
        v-for="(page, index) in numberOfPage"
        :key="page"
        :page="index + 1"
        @click="currentPage = index + 1"
        :class="
          index === currentPage - 1 ? 'text-background bg-foreground' : 'bg-muted text-foreground'
        "
      />
      <PaginationButton
        direction="next"
        @click="currentPage = Math.min(numberOfPage, currentPage + 1)"
        :disabled="currentPage === numberOfPage"
        class="disabled:opacity-30"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/Card/ArticleCard.vue'
import PaginationButton from '@/components/pagination/PaginationButton.vue'
import PaginationPageButton from '@/components/pagination/PaginationPageButton.vue'
import { useStorageStore } from '@/stores/useStorageStore.ts'
import { computed, ref, watch } from 'vue'

const store = useStorageStore()
const currentPage = ref(1)

const numberOfPage = computed(() => {
  return Math.ceil(matchingArticles.value.length / 9)
})

const matchingArticles = computed(() => {
  const searchQuery = store.searchQuery.trim().toLowerCase()

  return store.articles.filter((article) => {
    let readStatus = null

    if (store.readStatusFilter === 'read') readStatus = true
    if (store.readStatusFilter === 'unread') readStatus = false

    const matchesFilters =
      (store.categoryFilter === 'all' || article.category === store.categoryFilter) &&
      (store.readStatusFilter === 'all' || article.isRead === readStatus)

    if (!matchesFilters || !searchQuery) return matchesFilters

    return (
      article.title.toLowerCase().includes(searchQuery) ||
      article.description.toLowerCase().includes(searchQuery) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
      article.category.toLowerCase().includes(searchQuery)
    )
  })
})

const filteredArticles = computed(() => {
  const start = (currentPage.value - 1) * 9
  return matchingArticles.value.slice(start, start + 9)
})

watch(
  currentPage,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  { flush: 'post' },
)

watch(
  () => [store.categoryFilter, store.readStatusFilter, store.searchQuery],
  () => {
    currentPage.value = 1
  },
)

function toggleArticleRead(id: string) {
  store.toggleRead(id)
}

function deleteArticleCard(id: string) {
  store.deleteArticle(id)
}
</script>
