<template>
  <header class="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background">
    <RouterLink
      :to="{ name: 'articles.show' }"
      class="flex items-center gap-2"
      @click="toolbarToggle.showToolbar = true"
    >
      <div class="bg-primary size-7 rounded-lg flex items-center justify-center">
        <LogoApp />
      </div>
      <span class="font-display font-semibold tracking-tight">Nook</span>
    </RouterLink>

    <span
      class="text-xs mr-auto ml-3 bg-primary/85 px-2 py-0.5 rounded-full text-primary-foreground"
      >Demo</span
    >

    <div class="flex items-center gap-2">
      <p class="text-xs text-muted-foreground bg-secondary font-medium rounded-full px-2 py-0.5">
        {{ unread.length }} unread
      </p>
      <button
        title="Switch to dark mode"
        class="cursor-pointer size-9 flex items-center justify-center bg-muted rounded-full text-muted-foreground"
      >
        <DarkModeIcon />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoApp from '@/components/images/LogoApp.vue'
import DarkModeIcon from '@/components/icons/DarkModeIcon.vue'
import { useStorageStore } from '@/stores/useStorageStore.ts'
import { useToolbarToggle } from '@/stores/useToolbarToggle.ts'
import { computed } from 'vue'

const store = useStorageStore()
const toolbarToggle = useToolbarToggle()

const unread = computed(() => {
  return store.articles.filter((a) => !a.isRead)
})
</script>
