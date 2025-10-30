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

      <LanguageSelector />

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
import { useNotifyStore } from '@common/utils/notify'
import { useLoadingStore } from '@common/utils/loading'
import { useThemeStore } from '@/stores/theme'
import { useLocaleStore } from '@/stores/locale'
import { useThemeSync } from '@/composables/useThemeSync'

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

  notifyStore.setNotifyRef(floatingNotifyRef.value)
  loadingStore.setLoadingRef(loadingOverlayRef.value)
}

onMounted(registerGlobalComponentRefs)
</script>
