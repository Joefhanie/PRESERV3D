<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseenter="miniState = false"
        @mouseleave="miniState = true"
        mini-to-overlay
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        content-class="drawer-content"
      >
        <div class="absolute-full flex column">
          <div class="col" />
          <q-list padding>
            <q-item
              clickable
              v-ripple
              :active="activeItem === 'home'"
              @click="setActiveItem('home')"
            >
              <q-item-section avatar>
                <q-icon name="home" size="md" />
              </q-item-section>

              <q-item-section> Home </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="activeItem === 'artifacts'"
              @click="setActiveItem('artifacts')"
            >
              <q-item-section avatar>
                <q-icon name="emoji_events" size="md" />
              </q-item-section>

              <q-item-section> Artifacts </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="activeItem === 'documents'"
              @click="setActiveItem('documents')"
            >
              <q-item-section avatar>
                <q-icon name="book" size="md" />
              </q-item-section>

              <q-item-section> Documents </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="activeItem === 'gallery'"
              @click="setActiveItem('gallery')"
            >
              <q-item-section avatar>
                <q-icon name="auto_awesome_mosaic" size="md" />
              </q-item-section>

              <q-item-section> Gallery </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="activeItem === 'upload'"
              @click="setActiveItem('upload')"
            >
              <q-item-section avatar>
                <q-icon name="file_upload" size="md" />
              </q-item-section>

              <q-item-section> Upload </q-item-section>
            </q-item>
          </q-list>
          <div class="col" />
        </div>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const drawer = ref(false)
const miniState = ref(true)

const activeItem = ref('home')
const setActiveItem = (itemName) => {
  activeItem.value = itemName

  // Navigate to the corresponding route
  router.push(`${itemName}`)
}

onMounted(() => {
  // Extract the route path without leading slash
  const currentPath = route.path.substring(1)

  // If we're on the root path, set active to 'home'
  if (route.path === '/') {
    activeItem.value = 'home'
  }
  // Otherwise set active to the current path if it matches a sidebar item
  else if (['artifacts', 'documents', 'gallery', 'upload'].includes(currentPath)) {
    activeItem.value = currentPath
  }
})
</script>
