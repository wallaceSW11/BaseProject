# Vue 3 + TypeScript Project Base

A professional starter kit for scalable Vue 3 applications with TypeScript, Vuetify 3, and comprehensive testing setup.

## 🚀 Features

- ✅ Vue 3 with Composition API
- ✅ TypeScript for type safety
- ✅ Vuetify 3 with Material Design Icons
- ✅ **White Label Theme System** - Customize colors and branding via JSON
- ✅ **Light/Dark Theme Support** - Automatic theme switching with persistence
- ✅ Vue Router for navigation
- ✅ Pinia for state management
- ✅ Axios with interceptors
- ✅ Global reusable components
- ✅ PWA support
- ✅ Vitest for unit testing
- ✅ Cypress for E2E testing
- ✅ CI/CD with GitHub Actions

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🧪 Testing

### Unit Tests

```bash
npm run test:unit          # Run once
npm run test:unit:watch    # Watch mode
```

### E2E Tests

```bash
npm run test:e2e           # Run headless
npm run test:e2e:open      # Open Cypress UI
```

## 🎨 White Label Customization

Easily customize the application's branding without code changes:

1. Edit `public/theme.json` to configure:

   - Brand colors for light and dark themes
   - Logo paths for different themes
   - Application name and metadata

2. Toggle between light and dark themes using the theme switcher in the header

See [White Label Documentation](./docs/WHITE_LABEL.md) for complete customization guide.

## 📁 Project Structure

```
src/
├── common/               # Global components and utilities
│   ├── components/      # Reusable components
│   │   ├── buttons/    # Button variants
│   │   └── ...         # Modals, notifications, etc.
│   └── utils/          # Utility functions
├── stores/             # Pinia stores
│   ├── app.ts         # Application state
│   └── theme.ts       # Theme management
├── router/             # Vue Router config
├── views/              # Page components
└── main.ts             # App entry point
```

## 🧩 Global Components

All components in `common/components` are automatically registered globally:

- **Buttons**: PrimaryButton, SecondaryButton, TertiaryButton, QuartenaryButton
- **IconToolTip**: Icon with optional tooltip
- **ModalBase**: Flexible modal dialog
- **ConfirmDialog**: Promise-based confirmation dialog
- **FloatingNotify**: Toast notifications
- **LoadingOverlay**: Full-screen loading indicator
- **ThemeToggle**: Light/dark theme switcher

## 🔧 Utilities

- **notify(type, title, message)**: Display toast notifications
- **loading(show, message?)**: Show/hide loading overlay
- **api**: Configured Axios instance with interceptors
- **useThemeStore**: Access and control theme configuration

## 📝 License

MIT
