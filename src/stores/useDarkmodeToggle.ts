import { defineStore } from "pinia";
import { initDarkmodeToggle, saveThemeLocalStorage } from "@/composables/useLocalStorage";

export const useDarkmodeToggle = defineStore('darkmode', {
  state: () => {
    return {
      toggleMode: initDarkmodeToggle()
    }
  },
  actions: {
    saveTheme() {
      this.toggleMode = !this.toggleMode
      saveThemeLocalStorage(this.toggleMode)
    }
  }
})
