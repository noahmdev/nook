<template>
  <Button class="bg-muted">
    <svg
      v-if="props.direction === 'previous'"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M8.5 10.5L5 7l3.5-3.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>

    <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5.5 3.5L9 7l-3.5 3.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </Button>
</template>

<script setup lang="ts">
import Button from './Button.vue'

type Direction = 'previous' | 'next'

const props = defineProps<{
  direction: Direction
}>()
</script>
