<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>{{ appName }}</v-app-bar-title>

      <v-spacer />

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon to="/demo">
        <v-icon>mdi-test-tube</v-icon>
      </v-btn>

      <LanguageSelector :available-locales="availableLocales" />

      <ThemeToggle />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <FloatingNotify ref="floatingNotifyRef" />
    <LoadingOverlay ref="loadingOverlayRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNotifyStore } from '@wallacesw11/base-lib/utils'
import { useLoadingStore } from '@wallacesw11/base-lib/utils'
import { useConfirmStore } from '@wallacesw11/base-lib/utils'
import { useThemeSync } from '@wallacesw11/base-lib/composables'
import { useThemeStore } from '@wallacesw11/base-lib/stores'
import { useLocaleStore } from '@/stores/locale'
import { availableLocales } from '@/locales'

const floatingNotifyRef = ref()
const loadingOverlayRef = ref()
const confirmDialogRef = ref()

const themeStore = useThemeStore()
const localeStore = useLocaleStore()
const appName = computed(() => themeStore.appName)

useThemeSync()
localeStore.initializeLocale()

function registerGlobalComponentRefs() {
  const notifyStore = useNotifyStore()
  const loadingStore = useLoadingStore()
  const confirmStore = useConfirmStore()

  notifyStore.setNotifyRef(floatingNotifyRef.value)
  loadingStore.setLoadingRef(loadingOverlayRef.value)
  confirmStore.setConfirmRef(confirmDialogRef.value)
}

onMounted(registerGlobalComponentRefs)
</script>
