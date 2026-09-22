<template>
  <AppHeader :class="{ 'border-b border-b-border': route.name === 'modal.create' }" />
  <ArticleToolbar v-if="toolbarToggle.showToolbar" />
  <main :class="{ 'px-4 py-8 flex-1 md:px-8': route.name === 'articles.show' }">
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
