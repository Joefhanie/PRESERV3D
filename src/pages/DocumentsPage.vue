<template>
  <q-page class="q-pa-md">
    <div class="page-header">
      <h2 class="q-mb-sm title">Documents</h2>
      <h5 class="q-mt-xs q-mb-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h5>
    </div>
    <div>
      <div class="row q-gutter-md q-mt-md">
        <div v-for="(url, index) in documentsStore.documentsUrls" :key="index" class="card-wrapper">
          <q-card class="my-card" rounded bordered>
            <div class="card">
              <a :href="url" target="_blank">
                <PdfPreview :pdfUrl="url" class="document" />
              </a>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useModelStore } from 'stores/documentsStore'
import PdfPreview from 'components/PdfPreview.vue'

const documentsStore = useModelStore()

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/documents')
    const urls = await res.json()
    documentsStore.setDocuments(urls)
  } catch (err) {
    console.error('Failed to load documents', err)
  }
})
</script>
