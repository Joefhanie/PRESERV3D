import { defineStore } from 'pinia'

export const useModelStore = defineStore('modelStore', {
  state: () => ({
    modelUrls: [],
  }),
  actions: {
    addModel(url) {
      this.modelUrls.push(url)
    },
  },
})
