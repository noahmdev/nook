<template>
  <section class="sticky top-0 z-20 px-4 py-4 bg-background border-b border-b-border">
    <div class="max-w-5xl mx-auto flex items-center gap-3">
      <div class="relative w-full">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search articles,tags..."
          class="w-full pl-9 pr-4 py-2.5 rounded-full text-sm outline-none bg-secondary text-foreground border-[1.5px] border-transparent"
          v-model="store.searchQuery"
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
        v-for="(category, index) in categories"
        :key="category"
        class="shrink-0 px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
        :class="
          index === categoryButtonIndex
            ? 'text-background bg-foreground'
            : 'text-muted-foreground bg-muted'
        "
        @click="getCategoryFilter(index)"
      >
        {{ category }}
      </button>
    </div>

    <div class="max-w-5xl mx-auto mt-2 flex items-center gap-1 justify-end">
      <button
        v-for="(readStatus, index) in readStatusButton"
        :key="readStatus"
        class="px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
        :class="
          index === readButtonIndex
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        "
        @click="getReadStatusFilter(index)"
      >
        {{ readStatus }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useStorageStore } from '@/stores/useStorageStore'
import { useToolbarToggle } from '@/stores/useToolbarToggle.ts'
import { ref } from 'vue'

const toolbarToggle = useToolbarToggle()
const store = useStorageStore()

const readButtonIndex = ref(0)
const categoryButtonIndex = ref(0)

const categories: string[] = [
  'All',
  'Technology',
  'Design',
  'Science',
  'Culture',
  'Health',
  'Business',
]

const readStatusButton: string[] = ['All', 'Unread', 'Read']

function getReadStatusFilter(index: number) {
  readButtonIndex.value = index
  store.readStatusFilter = readStatusButton[readButtonIndex.value]!.toLowerCase()
}

function getCategoryFilter(index: number) {
  categoryButtonIndex.value = index
  store.categoryFilter = categories[categoryButtonIndex.value]!.toLowerCase()
}
</script>
