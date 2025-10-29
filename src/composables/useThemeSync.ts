import { watch, onMounted } from "vue";
import { useTheme as useVuetifyTheme } from "vuetify";
import { useThemeStore } from "@/stores/theme";

/**
 * Composable to sync theme store with Vuetify theme
 * Must be called from inside a component setup function
 */
export function useThemeSync() {
  const themeStore = useThemeStore();
  const vuetifyTheme = useVuetifyTheme();

  function syncTheme() {
    if (!themeStore.themeConfig) return;

    // Apply colors to Vuetify theme first
    const colors = themeStore.currentColors;
    Object.keys(colors).forEach((key) => {
      if (vuetifyTheme.themes.value[themeStore.currentMode]) {
        vuetifyTheme.themes.value[themeStore.currentMode].colors[key] =
          colors[key];
      }
    });

    // Update Vuetify theme mode
    // Using type assertion to access the change method that exists at runtime
    // but is not yet in the TypeScript types
    const themeApi = vuetifyTheme as any;
    if (typeof themeApi.global.change === "function") {
      themeApi.global.change(themeStore.currentMode);
    } else {
      vuetifyTheme.global.name.value = themeStore.currentMode;
    }
  }

  // Sync on mount
  onMounted(() => {
    syncTheme();
  });

  // Watch for theme changes
  watch(
    () => themeStore.currentMode,
    () => {
      syncTheme();
    }
  );

  watch(
    () => themeStore.currentColors,
    () => {
      syncTheme();
    },
    { deep: true }
  );

  return {
    syncTheme,
  };
}
