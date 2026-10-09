<template>
  <Button> {{ props.page }}</Button>
</template>

<script setup lang="ts">
import Button from './Button.vue'

const props = defineProps<{
  page: number
}>()
</script>
