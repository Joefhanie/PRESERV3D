<template>
  <q-page class="flex flex-center q-pa-md">
    <q-uploader
      ref="uploaderRef"
      url="http://localhost:3000/upload"
      label="Upload GLB Model or PDF"
      accept=".glb, .pdf"
      field-name="file"
      @uploaded="handleUploaded"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const uploaderRef = ref(null)

function handleUploaded(info) {
  console.log('Upload completed:', info.xhr.response)
}
</script>
