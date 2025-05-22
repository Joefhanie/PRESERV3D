<template>
  <q-page class="flex flex-center q-pa-md">
    <q-uploader
      ref="uploaderRef"
      url="/api/upload"
      label="Upload GLB Model or PDF"
      accept=".glb, .pdf"
      field-name="file"
      :headers="uploadHeaders"
      @uploaded="handleUploaded"
      :auto-upload="true"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const uploaderRef = ref(null)

function handleUploaded({ xhr }) {
  try {
    const response = JSON.parse(xhr.response)
    console.log('Upload successful:', response.url)
  } catch (err) {
    console.error('Failed to parse upload response:', err)
  }
}
</script>
