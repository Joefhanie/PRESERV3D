<template>
  <q-page class="q-pa-md">
    <div class="page-header">
      <h2 class="q-mb-sm title">Artifacts</h2>
      <h5 class="q-mt-xs q-mb-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h5>
    </div>
    <div class="row q-gutter-md q-mt-md">
      <div v-for="(model, i) in modelUrls" :key="i" class="card-wrapper">
        <q-card class="my-card" rounded bordered>
          <div class="card">
            <model-viewer
              :src="model"
              camera-controls
              loading="lazy"
              auto-rotate
              auto-rotate-delay="1500"
              rotation-per-second="10deg"
              shadow-intensity="1"
              class="artifacts"
              style="width: 300px; height: 300px"
            />
          </div>
          <q-card-actions align="right">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="teal" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@google/model-viewer'

const modelUrls = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/models')
    const contentType = res.headers.get('content-type')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`)
    }
    const urls = await res.json()
    modelUrls.value = urls
  } catch (err) {
    console.error('Failed to load models:', err)
  }
})
</script>
