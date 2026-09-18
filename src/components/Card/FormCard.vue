<template>
  <Card :clickable="false">
    <template #card__media>
      <div class="h-45 bg-muted relative">
        <span
          class="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground"
          >Preview</span
        >
        <img :src="props.image" alt="Article image" class="size-full object-cover" />
      </div>
    </template>

    <template #card__content>
      <div>
        <h2 class="text-base font-semibold leading-snug font-display mb-1 text-card-foreground">
          {{ props.title }}
        </h2>
        <p class="text-xs leading-relaxed line-clamp-2 text-muted-foreground">
          {{ props.description }}
        </p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card/Card.vue'

const props = defineProps<{
  image?: string
  title: string
  description: string
}>()
</script>
