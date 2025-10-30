# Vue 3 TypeScript Base - Development Guide

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📚 Project Structure Explained

### `/src/common/`

Contains all globally registered components and utilities:

- **components/buttons**: Reusable button components with consistent styling
- **components/**: Core UI components (modals, notifications, loading, tooltips)
- **utils/**: Utility functions for API calls, notifications, and loading states

### `/src/views/`

Page components that correspond to routes

### `/src/store/`

Pinia stores for state management

### `/src/router/`

Vue Router configuration

## 🧩 Using Global Components

All components in `/src/common/components` are automatically registered globally. No need to import them:

```vue
<template>
  <PrimaryButton text="Click me" icon="mdi-check" @click="handleClick" />
</template>
```

## 🔔 Notifications

Use the `notify` utility anywhere in your app:

```typescript
import { notify } from "@common/utils/notify";

notify("success", "Success!", "Operation completed");
notify("error", "Error!", "Something went wrong");
notify("warning", "Warning!", "Please check this");
notify("info", "Info", "Here is some information");
```

## ⏳ Loading Overlay

Show/hide loading overlay:

```typescript
import { loading } from "@common/utils/loading";

loading(true, "Processing...");

// After async operation
loading(false);
```

## 🌐 API Calls

Use the pre-configured Axios instance:

```typescript
import api from "@common/utils/api";

// GET request
const response = await api.get("/users");

// POST request
const newUser = await api.post("/users", { name: "John" });

// The loading overlay will show automatically
// Errors are handled and displayed via notifications
```

## 🧪 Testing

### Unit Tests (Vitest)

Run all tests:

```bash
npm run test:unit
```

Watch mode:

```bash
npm run test:unit:watch
```

### E2E Tests (Cypress)

Run headless:

```bash
npm run test:e2e
```

Open Cypress UI:

```bash
npm run test:e2e:open
```

## 🏗️ Building for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 💡 Tips

1. **Component Registration**: All components in `/src/common/components` are auto-registered. Just add your `.vue` file there and export it in `/src/common/index.ts`.

2. **Type Safety**: The project is fully typed. Use TypeScript interfaces for props and emits.

3. **Vuetify**: All Vuetify components are available. Check [Vuetify docs](https://vuetifyjs.com) for usage.

4. **Icons**: Use Material Design Icons with the `mdi-` prefix. Browse icons at [materialdesignicons.com](https://materialdesignicons.com).

5. **PWA**: The project is PWA-ready. Service worker is auto-generated during build.

## 🔧 Configuration

- **Vite**: `vite.config.ts`
- **TypeScript**: `tsconfig.json`
- **Vitest**: `vitest.config.ts`
- **Cypress**: `cypress.config.ts`
- **Router**: `src/router/index.ts`
- **Vuetify**: `src/plugins/vuetify.ts`

## 📝 Adding a New Page

1. Create view component in `/src/views/`:

```vue
<!-- src/views/MyNewPage.vue -->
<template>
  <v-container>
    <h1>My New Page</h1>
  </v-container>
</template>

<script setup lang="ts">
// Your logic here
</script>
```

2. Add route in `/src/router/index.ts`:

```typescript
{
  path: '/my-page',
  name: 'MyPage',
  component: () => import('@/views/MyNewPage.vue'),
}
```

## 🎨 Theming

Customize theme colors in `/src/plugins/vuetify.ts`:

```typescript
theme: {
  themes: {
    light: {
      colors: {
        primary: '#1867C0',
        secondary: '#5CBBF6',
        // ... more colors
      },
    },
  },
}
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Run tests: `npm run test:unit`
5. Submit pull request

## 📄 License

MIT
