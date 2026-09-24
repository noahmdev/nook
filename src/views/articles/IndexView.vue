<template>
  <div class="max-w-5xl mx-auto">
    <div class="flex items-baseline justify-between mb-5">
      <p class="text-xs text-muted-foreground">{{ store.articles.length }} articles</p>
      <p class="text-xs text-muted-foreground">Page n of n</p>
    </div>

    <div id="display-cards" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard
        v-for="article in store.articles"
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
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/Card/ArticleCard.vue'
import { useStorageStore } from '@/stores/useStorageStore.ts'

const store = useStorageStore()

function toggleArticleRead(id: string) {
  store.toggleRead(id)
}

function deleteArticleCard(id: string) {
  store.deleteArticle(id)
}
</script>
