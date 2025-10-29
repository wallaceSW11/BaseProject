# Theme Configuration Examples

## Example 1: Blue Corporate Theme

```json
{
  "name": "Corporate Blue Theme",
  "version": "1.0.0",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "favicon": "/favicon.ico"
  },
  "colors": {
    "light": {
      "primary": "#0052CC",
      "secondary": "#4C9AFF",
      "accent": "#00B8D9",
      "error": "#DE350B",
      "info": "#0065FF",
      "success": "#00875A",
      "warning": "#FF991F",
      "background": "#FFFFFF",
      "surface": "#F4F5F7"
    },
    "dark": {
      "primary": "#4C9AFF",
      "secondary": "#253858",
      "accent": "#00B8D9",
      "error": "#FF5630",
      "info": "#0065FF",
      "success": "#36B37E",
      "warning": "#FFAB00",
      "background": "#1F1F1F",
      "surface": "#2D2D2D"
    }
  },
  "fonts": {
    "primary": "Inter, sans-serif",
    "monospace": "Fira Code, monospace"
  },
  "customization": {
    "appName": "Corporate Portal",
    "appDescription": "Enterprise business management platform",
    "copyrightText": "© 2025 Corporate Inc. All rights reserved."
  }
}
```

## Example 2: Purple Creative Theme

```json
{
  "name": "Creative Purple Theme",
  "version": "1.0.0",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "favicon": "/favicon.ico"
  },
  "colors": {
    "light": {
      "primary": "#7C3AED",
      "secondary": "#A78BFA",
      "accent": "#EC4899",
      "error": "#EF4444",
      "info": "#3B82F6",
      "success": "#10B981",
      "warning": "#F59E0B",
      "background": "#FFFFFF",
      "surface": "#F9FAFB"
    },
    "dark": {
      "primary": "#A78BFA",
      "secondary": "#4C1D95",
      "accent": "#F472B6",
      "error": "#F87171",
      "info": "#60A5FA",
      "success": "#34D399",
      "warning": "#FBBF24",
      "background": "#0F0F0F",
      "surface": "#1E1E1E"
    }
  },
  "fonts": {
    "primary": "Poppins, sans-serif",
    "monospace": "JetBrains Mono, monospace"
  },
  "customization": {
    "appName": "Creative Studio",
    "appDescription": "Design and creative collaboration platform",
    "copyrightText": "© 2025 Creative Studio. All rights reserved."
  }
}
```

## Example 3: Green Eco Theme

```json
{
  "name": "Eco Green Theme",
  "version": "1.0.0",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "favicon": "/favicon.ico"
  },
  "colors": {
    "light": {
      "primary": "#059669",
      "secondary": "#34D399",
      "accent": "#10B981",
      "error": "#DC2626",
      "info": "#0EA5E9",
      "success": "#22C55E",
      "warning": "#F59E0B",
      "background": "#FFFFFF",
      "surface": "#F0FDF4"
    },
    "dark": {
      "primary": "#34D399",
      "secondary": "#065F46",
      "accent": "#6EE7B7",
      "error": "#EF4444",
      "info": "#38BDF8",
      "success": "#4ADE80",
      "warning": "#FBBF24",
      "background": "#0C1713",
      "surface": "#14251D"
    }
  },
  "fonts": {
    "primary": "Nunito, sans-serif",
    "monospace": "Source Code Pro, monospace"
  },
  "customization": {
    "appName": "EcoTrack",
    "appDescription": "Sustainable business tracking platform",
    "copyrightText": "© 2025 EcoTrack. All rights reserved."
  }
}
```

## Example 4: Orange Energy Theme

```json
{
  "name": "Energy Orange Theme",
  "version": "1.0.0",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "favicon": "/favicon.ico"
  },
  "colors": {
    "light": {
      "primary": "#EA580C",
      "secondary": "#FB923C",
      "accent": "#F97316",
      "error": "#DC2626",
      "info": "#3B82F6",
      "success": "#16A34A",
      "warning": "#FACC15",
      "background": "#FFFFFF",
      "surface": "#FFF7ED"
    },
    "dark": {
      "primary": "#FB923C",
      "secondary": "#7C2D12",
      "accent": "#FDBA74",
      "error": "#EF4444",
      "info": "#60A5FA",
      "success": "#22C55E",
      "warning": "#FDE047",
      "background": "#1C0F08",
      "surface": "#2C1810"
    }
  },
  "fonts": {
    "primary": "Open Sans, sans-serif",
    "monospace": "Monaco, monospace"
  },
  "customization": {
    "appName": "PowerHub",
    "appDescription": "Energy management and monitoring system",
    "copyrightText": "© 2025 PowerHub. All rights reserved."
  }
}
```

## Color Selection Tips

### Primary Color

- Main brand color
- Should be distinctive and memorable
- Used for CTAs and important elements
- Recommended: Medium to dark saturation

### Secondary Color

- Complements primary color
- Often lighter or darker variant of primary
- Used for secondary actions and accents

### Accent Color

- Highlights and special elements
- Should contrast with primary/secondary
- Can be from complementary color palette

### Error, Success, Warning, Info

- Follow standard color conventions:
  - **Error**: Red tones (#DC2626, #EF4444)
  - **Success**: Green tones (#10B981, #22C55E)
  - **Warning**: Orange/Yellow tones (#F59E0B, #FBBF24)
  - **Info**: Blue tones (#3B82F6, #0EA5E9)

### Background & Surface

- **Light theme**:
  - Background: Pure white (#FFFFFF) or light gray
  - Surface: Slightly darker than background for cards/panels
- **Dark theme**:
  - Background: Very dark gray (#0F0F0F to #1F1F1F)
  - Surface: Slightly lighter than background (#2D2D2D to #3D3D3D)

## Accessibility Guidelines

1. **Contrast Ratios**

   - Normal text: Minimum 4.5:1 against background
   - Large text (18pt+): Minimum 3:1 against background
   - Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

2. **Color Blindness**

   - Don't rely solely on color to convey information
   - Test with color blindness simulators
   - Ensure sufficient contrast in all modes

3. **Dark Mode**
   - Avoid pure black backgrounds (#000000)
   - Use dark grays (#121212 to #1F1F1F)
   - Reduce overall contrast to prevent eye strain

## Testing Your Theme

1. **Visual Testing**

   ```bash
   npm run dev
   ```

   - Navigate to `/demo` to see all components
   - Toggle between light and dark themes
   - Verify all colors display correctly

2. **Color Contrast**

   - Use browser DevTools to inspect computed colors
   - Test with browser accessibility features
   - Verify readability in both themes

3. **Cross-browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Check color rendering consistency
   - Verify theme persistence across sessions

## Deployment

When deploying with a custom theme:

1. Update `public/theme.json` with your configuration
2. Add logo files to `public/` directory
3. Build the application: `npm run build`
4. Deploy the `dist/` folder

The theme configuration is loaded at runtime, so you can update it without rebuilding the application.
