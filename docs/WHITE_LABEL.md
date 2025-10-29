# White Label Theme System

## Overview

This project includes a complete white label theming system that allows customization of colors, logos, and branding without code changes. All customizations are managed through a single JSON configuration file.

## Configuration File

### Location

`public/theme.json`

### Structure

```json
{
  "name": "Your App Name",
  "version": "1.0.0",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "favicon": "/favicon.ico"
  },
  "colors": {
    "light": {
      "primary": "#1867C0",
      "secondary": "#5CBBF6",
      "accent": "#005CAF",
      "error": "#FF5252",
      "info": "#2196F3",
      "success": "#4CAF50",
      "warning": "#FB8C00",
      "background": "#FFFFFF",
      "surface": "#FFFFFF"
    },
    "dark": {
      "primary": "#2196F3",
      "secondary": "#424242",
      "accent": "#82B1FF",
      "error": "#FF5252",
      "info": "#2196F3",
      "success": "#4CAF50",
      "warning": "#FFA726",
      "background": "#121212",
      "surface": "#212121"
    }
  },
  "fonts": {
    "primary": "Roboto, sans-serif",
    "monospace": "Courier New, monospace"
  },
  "customization": {
    "appName": "Vue3 TypeScript Base",
    "appDescription": "A professional Vue 3 + TypeScript starter kit",
    "copyrightText": "© 2025 Vue3 Base. All rights reserved."
  }
}
```

## Theme Colors

### Supported Color Properties

Each theme mode (light/dark) supports the following color properties:

- **primary**: Main brand color, used for primary actions and highlights
- **secondary**: Secondary brand color, used for complementary UI elements
- **accent**: Accent color for special highlights and emphasis
- **error**: Error state color (red tones)
- **info**: Informational color (blue tones)
- **success**: Success state color (green tones)
- **warning**: Warning state color (orange/amber tones)
- **background**: Main background color
- **surface**: Surface/card background color

### Color Format

All colors must be valid hexadecimal color codes:

- 6-digit format: `#RRGGBB`
- Example: `#1867C0`, `#FF5252`

## Logo Configuration

### Logo Properties

```json
"logo": {
  "light": "/logo-light.svg",  // Logo for light theme
  "dark": "/logo-dark.svg",     // Logo for dark theme
  "favicon": "/favicon.ico"     // Browser favicon
}
```

### Logo Requirements

- Place logo files in the `public/` directory
- Paths are relative to the public directory (start with `/`)
- Supported formats: SVG (recommended), PNG, JPG
- Recommended sizes:
  - Header logo: 200x50px
  - Favicon: 32x32px or 64x64px

## Usage in Code

### Accessing Theme Store

```typescript
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// Get current theme mode
const currentMode = themeStore.currentMode; // 'light' or 'dark'

// Get current colors
const colors = themeStore.currentColors;

// Get current logo
const logo = themeStore.currentLogo;

// Get app name
const appName = themeStore.appName;
```

### Toggle Theme

```typescript
// Toggle between light and dark
themeStore.toggleTheme();

// Set specific theme
themeStore.setTheme("dark");
themeStore.setTheme("light");
```

### Update Colors Programmatically

```typescript
// Update specific colors in current theme
themeStore.updateThemeColors({
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
});
```

## Theme Persistence

The user's theme preference is automatically saved to `localStorage` and restored on page reload.

**Storage Key**: `app-theme`
**Possible Values**: `'light'` or `'dark'`

## Theme Toggle Component

A ready-to-use `ThemeToggle` component is available globally:

```vue
<template>
  <ThemeToggle />
</template>
```

The component displays a sun icon (☀️) in dark mode and a moon icon (🌙) in light mode.

## Customization Workflow

### For End Users (White Label Deployment)

1. **Customize Colors**

   - Edit `public/theme.json`
   - Update color values in both `light` and `dark` themes
   - Use brand colors in hexadecimal format

2. **Upload Logos**

   - Create light and dark theme logos
   - Place files in `public/` directory
   - Update paths in `theme.json`

3. **Update Branding**

   - Change `appName` for header title
   - Update `appDescription` for meta tags
   - Modify `copyrightText` for footer

4. **Deploy**
   - No code changes required
   - Build and deploy the application
   - Theme will load automatically

### For Developers

The theme system is initialized in `src/main.ts`:

```typescript
import { useThemeStore } from "./stores/theme";

const themeStore = useThemeStore();
themeStore.loadTheme().then(() => {
  app.mount("#app");
});
```

**Important**: The app waits for theme configuration to load before mounting to prevent flash of unstyled content.

## Theme Store API

### State

- `themeConfig`: Complete theme configuration object
- `isDark`: Boolean indicating if dark theme is active
- `isLoading`: Boolean indicating if theme is loading

### Computed Properties

- `currentMode`: Current theme mode ('light' | 'dark')
- `currentLogo`: Logo URL for current theme
- `currentColors`: Color object for current theme
- `appName`: Application name from config

### Methods

- `loadTheme()`: Load theme from theme.json
- `toggleTheme()`: Switch between light and dark modes
- `setTheme(mode)`: Set specific theme mode
- `updateThemeColors(colors)`: Update colors programmatically

## Best Practices

1. **Color Contrast**: Ensure sufficient contrast between text and backgrounds
2. **Consistency**: Use theme colors consistently across all components
3. **Testing**: Test both light and dark themes thoroughly
4. **Accessibility**: Maintain WCAG AA contrast ratios (4.5:1 for normal text)
5. **Fallbacks**: Default theme is used if theme.json fails to load

## Troubleshooting

### Theme Not Loading

- Check browser console for errors
- Verify `theme.json` is in `public/` directory
- Ensure JSON syntax is valid
- Check network tab for 404 errors

### Colors Not Applying

- Verify color format is valid hexadecimal
- Check that Vuetify theme is applying colors
- Inspect elements to see computed CSS variables

### Logo Not Displaying

- Verify logo file exists in `public/` directory
- Check file path starts with `/`
- Ensure file format is supported (SVG, PNG, JPG)
- Check browser console for 404 errors

## Migration Guide

### From Hardcoded Themes

1. Extract current color values to `theme.json`
2. Replace hardcoded colors with theme store references
3. Update logo references to use `currentLogo` computed property
4. Test both light and dark themes

### Adding New Color Properties

1. Add new color to both light and dark themes in `theme.json`
2. Use Vuetify's color system to apply colors:
   ```vue
   <v-btn color="custom-color">Button</v-btn>
   ```

## Examples

### Complete Theme Configuration

See `public/theme.json` for the default configuration.

### Using Theme in Components

```vue
<template>
  <v-app-bar :color="themeStore.currentColors.primary">
    <v-img :src="themeStore.currentLogo" max-height="40" />
    <v-toolbar-title>{{ themeStore.appName }}</v-toolbar-title>
    <ThemeToggle />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>
```

## Support

For issues or questions about the theme system:

- Check this documentation
- Review `src/stores/theme.ts` for implementation details
- Test with default `theme.json` configuration
