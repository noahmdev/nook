<template>
  <div class="min-h-full px-4 py-8">
    <section class="max-w-xl mx-auto">
      <RouterLink
        :to="{ name: 'articles.show' }"
        class="inline-flex items-center gap-1.5 text-sm font-medium mb-8 text-muted-foreground"
        @click="toolbarToggle.showToolbar = true"
      >
        <PreviousPageIcon />

        Back to library
      </RouterLink>

      <h1 class="text-3xl font-medium mb-1 font-display text-foreground">Save an article</h1>
      <p class="text-sm mb-8 text-muted-foreground">
        Paste a URL and we will fetch the details automatically.
      </p>

      <form @submit.prevent="handleSubmit" method="POST">
        <label class="mb-6 inline-block w-full">
          <span
            class="inline-block text-xs font-semibold mb-1.5 uppercase tracking-wide text-muted-foreground"
          >
            Article URL
          </span>
          <input
            type="url"
            class="w-full px-4 py-3 outline-none bg-card border-[1.5px] border-border text-foreground rounded-xl text-sm"
            placeholder="https://example.com/my-article"
            required
            v-model="url"
          />
        </label>

        <article v-if="urlToggle">
          <FormCard
            v-if="fetchArticle"
            :title="fetchArticle.title"
            :description="fetchArticle.description"
            :image="fetchArticle.image"
          />

          <div role="group" aria-label="Article category" class="mb-5 mt-6">
            <h3 class="text-xs font-semibold mb-2 uppercase tracking-wide text-muted-foreground">
              Category
            </h3>

            <div class="flex items-center flex-wrap gap-2">
              <button
                type="button"
                v-for="(button, index) in categoryButtonArray"
                :key="button"
                class="cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium"
                :class="
                  index === categoryButtonData.index
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground'
                "
                @click="getCategoryData(index)"
              >
                {{ button }}
              </button>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-xs font-semibold mb-2 uppercase tracking-wide text-muted-foreground">
              Tags
            </h3>

            <div class="mb-2 flex flex-wrap gap-1.5">
              <Tag
                v-for="(tag, index) in tags"
                :tag="tag"
                :key="tag"
                @click="tags = tags.filter((tag, i) => i !== index)"
              />
            </div>

            <div class="flex gap-2">
              <label class="w-full">
                <input
                  type="text"
                  class="flex-1 w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-card border-[1.5px] border-border text-foreground"
                  placeholder="Add a tag and press Enter"
                  v-model="inputTag"
                  @keydown.enter.prevent="addTag()"
                />
              </label>

              <button
                type="button"
                class="px-4 py-2.5 rounded-xl text-sm font-semibold bg-secondary text-secondary-foreground cursor-pointer"
                @click="addTag()"
              >
                Add
              </button>
            </div>
          </div>
        </article>

        <button
          type="submit"
          class="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-primary cursor-pointer text-primary-foreground disabled:opacity-40 disabled: disabled:pointer-events-none"
          :disabled="!urlToggle"
        >
          Paste a URL above to continue
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PreviousPageIcon from '@/components/icons/PreviousPageIcon.vue'
import FormCard from '@/components/Card/FormCard.vue'
import { getOgMetadata } from '@/services/ogService.ts'
import type { Article, ogMetaData } from '@/types/article.types.ts'
import Tag from '@/components/Tag.vue'
import { useStorageStore } from '@/stores/useStorageStore.ts'
import { useToolbarToggle } from '@/stores/useToolbarToggle.ts'

const url = ref<string>('')
const urlToggle = ref<boolean>(false)
const fetchArticle = ref<ogMetaData>()
let time: ReturnType<typeof setTimeout> | undefined
const categoryButtonData = ref({
  index: 0,
  category: 'Technology',
})
const tags = ref<string[]>([])
const inputTag = ref<string>('')

const store = useStorageStore()
const router = useRouter()
const toolbarToggle = useToolbarToggle()

function addTag() {
  tags.value.push(inputTag.value.toLowerCase())
  inputTag.value = ''
}

function handleSubmit(): void {
  if (!fetchArticle.value) return

  const date = new Date()
  const currentDate = `${date.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, ${date.getFullYear()}`

  const article: Article = {
    id: crypto.randomUUID(),
    url: fetchArticle.value.url,
    title: fetchArticle.value.title,
    description: fetchArticle.value.description,
    image: fetchArticle.value.image,
    tags: tags.value,
    category: categoryButtonData.value.category,
    isRead: false,
    dateAdded: currentDate,
  }
  store.saveItem(article)

  toolbarToggle.showToolbar = true
  router.push({ name: 'articles.show' })
}

watch(url, async () => {
  clearTimeout(time)
  time = setTimeout(async () => {
    if (isUrlValid.value) {
      fetchArticle.value = await getOgMetadata(url.value)
    }
  }, 500)
})

const categoryButtonArray = ['Technology', 'Design', 'Science', 'Culture', 'Health', 'Business']

const isUrlValid = computed(() => {
  try {
    const u = new URL(url.value)
    const conditions = u.protocol === 'https:' || u.protocol === 'http:' || u.hostname !== ''
    if (conditions) {
      urlToggle.value = true
      return true
    }
  } catch {
    urlToggle.value = false
    return false
  }
})

function getCategoryData(index: number) {
  categoryButtonData.value.index = index
  categoryButtonData.value.category = categoryButtonArray[categoryButtonData.value.index]!
}
</script>
