<template>
  <Card :clickable="true" :id="props.id">
    <template #card__media>

      <img :src="props?.image" alt="Image of the article" class="size-full object-cover" />

      <div v-if="!props.isRead" class="absolute size-2.5 top-3 left-3 rounded-full bg-primary"></div>

      <button
        class="absolute group-hover:opacity-100 hover:scale-115 transition-all duration-150 cursor-pointer bottom-3 z-3 right-3 size-7 rounded-full flex items-center justify-center text-white bg-black/55 opacity-0"
        title="Delete article"
        @click="handleDeleteCard"
      >
        <DeleteIcon />
      </button>
    </template>

    <template #card__content>
      <div class="flex items-center justify-between">
        <span
          class="inline-flex items-center rounded-full font-medium px-2 py-0.5 text-xs bg-tag-design-bg text-tag-design-fg"
          >{{ props.category }}</span
        >
      </div>

      <h3
        class="text-base font-semibold leading-snug line-clamp-2 font-display text-card-foreground"
      >
        {{ props.title }}
      </h3>

      <p class="text-xs leading-relaxed line-clamp-2 text-muted-foreground">
        {{ props.description }}
      </p>

      <div class="flex overflow-x-scroll hide-scrollbar gap-1">
        <span
          v-for="tag in props.tags"
          :key="tag"
          class="z-3 inline-block items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground cursor-pointer"
          >#{{ tag }}</span
        >
      </div>

      <div class="flex items-center justify-between pt-1">
        <time class="text-xs text-muted-foreground"> {{ props.date }} </time>

        <div class="flex items-center gap-1.5">
          <span class="text-xs text-muted-foreground">Unread</span>
          <button
            class="inline-flex h-6 w-11 relative items-center rounded-full bg-muted z-3 cursor-pointer transition-all duration-100"
            title="Mark as read"
            @click="handleRead"
            :class="props.isRead ? 'bg-primary' : ''"
          >
            <span class="inline-block size-4 rounded-full bg-white shadow-sm translate-x-1 transition-all duration-200"
                  :class="props.isRead ? 'translate-x-6' : ''"
            ></span>
          </button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card/Card.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

const emit = defineEmits<{
  toggleRead: [id: string]
  deleteCard: [id: string]
}>()

const props = withDefaults(defineProps<{
  id: string
  image?: string
  category: string
  title: string
  description: string
  tags?: string[]
  isRead: boolean
  date: string
}>(), {
  image: '',
  tags: () => [],
})

function handleRead() {
  emit('toggleRead', props.id)
}

function handleDeleteCard() {
  emit('deleteCard', props.id)
}
</script>
