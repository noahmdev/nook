<template>
  <section class="max-w-2xl mx-auto">
    <RouterLink
      :to="{ name: 'articles.index' }"
      class="inline-flex items-center gap-1.5 text-sm font-medium mb-8 text-muted-foreground"
      @click="toolbarToggle.showToolbar = true"
    >
      <PreviousPageIcon />

      Back to library
    </RouterLink>
    <div class="w-full rounded-[20px] overflow-hidden mb-8 h-50 bg-muted">
      <img :src="article?.image" alt="Image of the article" class="size-full object-cover" />
    </div>

    <div class="flex items-center gap-2 mb-4">
      <span
        class="rounded-full font-medium px-3 py-1 text-sm capitalize"
        :class="[
          categoryColors[article.category].background,
          categoryColors[article.category].textColor,
        ]"
      >
        {{ article?.category }}
      </span>

      <div class="flex items-center gap-2 overflow-x-scroll hide-scrollbar">
        <Tag v-for="tag in article?.tags" :tag="tag" :form="false" :key="tag" />
      </div>
    </div>

    <h1 class="text-3xl md:text-4xl font-medium leading-tight mb-4 font-display text-foreground">
      {{ article?.title }}
    </h1>

    <p class="text-base leading-relaxed mb-8 text-muted-foreground">
      {{ article?.description }}
    </p>

    <div class="rounded-[14px] p-5 bg-card border border-border shadow-sm">
      <div class="flex items-center justify-between mb-5">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide mb-0.5 text-muted-foreground">
            Date saved
          </p>
          <time class="text-sm font-medium text-foreground">{{ article?.dateAdded }}</time>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-xs font-semibold uppercase tracking-wide mb-0.5 text-muted-foreground">
              Status
            </p>
            <p class="text-sm font-medium text-foreground">
              {{ article.isRead ? 'Read' : 'Unread' }}
            </p>
          </div>

          <button
            class="inline-flex h-6 w-11 relative items-center rounded-full bg-muted z-3 cursor-pointer transition-all duration-100"
            title="Mark as read"
            :class="article.isRead ? 'bg-primary' : ''"
            @click="handleRead"
          >
            <span
              class="inline-block size-4 rounded-full bg-white shadow-sm translate-x-1 transition-all duration-200"
              :class="article.isRead ? 'translate-x-6' : ''"
            ></span>
          </button>
        </div>
      </div>

      <a
        :href="article.url"
        class="flex items-center w-full justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-85 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open original article
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </a>
    </div>

    <button
      class="mt-4 flex items-center justify-center gap-2 mx-auto text-xs font-medium text-[#ef4444] opacity-40 cursor-pointer hover:opacity-100 transition-opacity"
      @click="handleDeleteArticle"
    >
      Remove from shelf
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7a.5.5 0 00.5.5h5a.5.5 0 00.5-.5l.5-7"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { useStorageStore } from '@/stores/useStorageStore'
import { useToolbarToggle } from '@/stores/useToolbarToggle'
import { useRoute, useRouter } from 'vue-router'
import PreviousPageIcon from '@/components/icons/PreviousPageIcon.vue'
import Tag from '@/components/Tag.vue'
import { categoryColors } from '@/constants/categoryColors'

const store = useStorageStore()
const route = useRoute()
const router = useRouter()
const toolbarToggle = useToolbarToggle()

toolbarToggle.showToolbar = false

const article = store.articles.find((a) => a.id === route.params.id)!

function handleDeleteArticle() {
  store.deleteArticle(article.id)
  toolbarToggle.showToolbar = true
  router.push({ name: 'articles.index' })
}

function handleRead() {
  store.toggleRead(article.id)
}
</script>
