<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        :prepend-icon="currentLocaleFlag"
      >
        {{ currentLocaleName }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="loc in locales"
        :key="loc.code"
        :active="locale === loc.code"
        @click="setLocale(loc.code)"
      >
        <template v-slot:prepend>
          <span class="mr-2">{{ loc.flag }}</span>
        </template>
        <v-list-item-title>{{ loc.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { locale, locales, setLocale } = useLocale()

const currentLocaleData = computed(() => {
  return locales.find(l => l.code === locale.value) || locales[0]
})

const currentLocaleName = computed(() => currentLocaleData.value.name)
const currentLocaleFlag = computed(() => currentLocaleData.value.flag)
</script>
