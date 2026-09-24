<template>
  <AppHeader
    :class="{
      'border-b border-b-border': route.name === 'modal.create' || route.name === 'article.show',
    }"
  />
  <ArticleToolbar v-if="toolbarToggle.showToolbar" />
  <main
    class="min-h-full"
    :class="{
      'px-4 py-8 md:px-8': route.name === 'articles.index' || route.name === 'article.show',
    }"
  >
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import ArticleToolbar from '@/components/layout/ArticleToolbar.vue'
import { useRoute } from 'vue-router'
import { useToolbarToggle } from '@/stores/useToolbarToggle.ts'

const route = useRoute()

const toolbarToggle = useToolbarToggle()
toolbarToggle.showToolbar = true
</script>
