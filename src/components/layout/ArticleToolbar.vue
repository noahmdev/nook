<template>
  <section class="sticky top-0 z-20 px-4 py-4 bg-background border-b border-b-border">
    <div class="max-w-5xl mx-auto flex items-center gap-3">
      <div class="relative w-full">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search articles,tags..."
          class="w-full pl-9 pr-4 py-2.5 rounded-full text-sm outline-none bg-secondary text-foreground border-[1.5px] border-transparent"
        />
      </div>
      <RouterLink
        :to="{ name: 'modal.create' }"
        class="shrink-0 flex items-center mx-auto gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold cursor-pointer"
        @click="toolbarToggle.showToolbar = false"
      >
        <span class="text-base leading-none">+</span>
        <span class="hidden sm:inline">Save</span>
      </RouterLink>
    </div>

    <div class="hide-scrollbar max-w-5xl mx-auto flex items-center mt-3 overflow-x-auto pb-1 gap-2">
      <button
        v-for="tag in tags"
        :key="tag"
        class="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground first:bg-foreground first:text-background cursor-pointer"
      >
        {{ tag }}
      </button>
    </div>

    <div class="max-w-5xl mx-auto mt-2 flex items-center gap-1 justify-end">
      <button
        v-for="state in states"
        :key="state"
        class="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground first:bg-primary first:text-primary-foreground"
      >
        {{ state }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useToolbarToggle } from '@/stores/useToolbarToggle.ts'

const toolbarToggle = useToolbarToggle()

const tags: string[] = ['All', 'Technology', 'Design', 'Science', 'Culture', 'Health', 'Business']

const states: string[] = ['All', 'Unread', 'Read']
</script>
