<template>
  <button
    class="cursor-pointer inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground"
  >
    #{{ props.tag }}

    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 2l6 6M8 2L2 8"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string
}>()
</script>
