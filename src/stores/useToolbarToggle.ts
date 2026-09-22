import { defineStore } from 'pinia'

export const useToolbarToggle = defineStore('toolbar', {
  state: () => {
    return {
      showToolbar: true
    }
  },
})
