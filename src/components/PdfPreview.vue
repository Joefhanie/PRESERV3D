<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
})

const canvasRef = ref(null)

onMounted(async () => {
  if (!props.pdfUrl) return

  const loadingTask = pdfjsLib.getDocument(props.pdfUrl)
  const pdf = await loadingTask.promise
  const page = await pdf.getPage(1) // First page

  const viewport = page.getViewport({ scale: 1.5 })
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  canvas.height = viewport.height
  canvas.width = viewport.width

  await page.render({ canvasContext: context, viewport }).promise
})
</script>
