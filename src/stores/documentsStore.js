import { defineStore } from 'pinia'

export const useModelStore = defineStore('documentsStore', {
  state: () => ({
    documentsUrls: [],
  }),
  actions: {
    setDocuments(urls) {
      this.documentsUrls = urls
    },
  },
})
