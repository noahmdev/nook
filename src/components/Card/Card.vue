<template>
  <article
    class="group relative rounded-[14px] overflow-hidden flex flex-col bg-card border border-border shadow-sm"
  >
    <RouterLink to="/test" class="absolute inset-0 z-1" v-if="props.clickable" />
    <div class="relative overflow-hidden h-45 bg-muted">
      <slot name="card__media"></slot>
    </div>

    <div class="flex flex-col flex-1 p-4 gap-2">
      <slot name="card__content"></slot>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  clickable?: boolean
}>()
</script>
