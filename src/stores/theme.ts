import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface ThemeConfig {
  name: string;
  version: string;
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  fonts: {
    primary: string;
    monospace: string;
  };
  customization: {
    appName: string;
    appDescription: string;
    copyrightText: string;
  };
}

export const useThemeStore = defineStore("theme", () => {
  const themeConfig = ref<ThemeConfig | null>(null);
  const isDark = ref(false);
  const isLoading = ref(true);

  // Computed
  const currentMode = computed(() => (isDark.value ? "dark" : "light"));
  const currentLogo = computed(
    () => themeConfig.value?.logo[currentMode.value] || ""
  );
  const currentColors = computed(
    () => themeConfig.value?.colors[currentMode.value] || {}
  );
  const appName = computed(
    () => themeConfig.value?.customization.appName || "Vue3 Base"
  );

  // Actions
  async function loadTheme() {
    try {
      isLoading.value = true;
      const response = await fetch("/theme.json");
      if (!response.ok) {
        throw new Error("Failed to load theme configuration");
      }
      themeConfig.value = await response.json();

      // Load saved theme preference from localStorage
      const savedTheme = localStorage.getItem("app-theme");
      isDark.value = savedTheme === "dark";

      // Apply theme to Vuetify
      applyTheme();
    } catch (error) {
      console.error("Error loading theme:", error);
    } finally {
      isLoading.value = false;
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem("app-theme", currentMode.value);
    applyTheme();
  }

  function setTheme(mode: "light" | "dark") {
    isDark.value = mode === "dark";
    localStorage.setItem("app-theme", mode);
    applyTheme();
  }

  function applyTheme() {
    if (!themeConfig.value) return;

    // Update HTML data attribute for Vuetify
    const html = document.documentElement;
    html.setAttribute("data-theme", currentMode.value);

    // Dispatch custom event for components that need to react
    window.dispatchEvent(
      new CustomEvent("theme-changed", {
        detail: {
          mode: currentMode.value,
          colors: currentColors.value,
        },
      })
    );
  }

  function updateThemeColors(colors: Record<string, string>) {
    if (!themeConfig.value) return;

    themeConfig.value.colors[currentMode.value] = {
      ...themeConfig.value.colors[currentMode.value],
      ...colors,
    };
    applyTheme();
  }

  return {
    // State
    themeConfig,
    isDark,
    isLoading,

    // Computed
    currentMode,
    currentLogo,
    currentColors,
    appName,

    // Actions
    loadTheme,
    toggleTheme,
    setTheme,
    updateThemeColors,
  };
});
