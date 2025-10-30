# 🎯 Quick Start Guide

## Installation (Run these commands in PowerShell)

```powershell
# Navigate to project directory
cd c:\git\BaseProject

# Option 1: Use the setup script (Recommended)
.\setup.ps1

# Option 2: Manual setup
npm install
Copy-Item .env.example .env
```

## Start Development

```powershell
npm run dev
```

Open browser to: **http://localhost:5173**

## Available Scripts

| Command                   | Description                  |
| ------------------------- | ---------------------------- |
| `npm run dev`             | Start development server     |
| `npm run build`           | Build for production         |
| `npm run preview`         | Preview production build     |
| `npm run test:unit`       | Run unit tests               |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:e2e`        | Run E2E tests (headless)     |
| `npm run test:e2e:open`   | Open Cypress UI              |

## 🎨 What You Get

### Global Components (No imports needed!)

```vue
<template>
  <!-- Buttons -->
  <PrimaryButton text="Save" icon="mdi-content-save" @click="save" />
  <SecondaryButton text="Cancel" @click="cancel" />

  <!-- Tooltip -->
  <IconToolTip icon="mdi-help-circle" text="Help" />

  <!-- All components work without imports! -->
</template>
```

### Utilities

```typescript
// Notifications
import { notify } from "@common/utils/notify";
notify("success", "Done!", "Saved successfully");

// Loading
import { loading } from "@common/utils/loading";
loading(true, "Saving...");
await api.post("/save", data);
loading(false);

// API Calls
import api from "@common/utils/api";
const users = await api.get("/users");
```

## 📱 Test the Demo

1. Start dev server: `npm run dev`
2. Go to http://localhost:5173
3. Click "View Demo" button
4. Try all the components!

## 🎓 Learn More

- **README.md** - Project overview
- **DEVELOPMENT.md** - Complete development guide
- **PROJECT_COMPLETE.md** - Full feature list

## ⚡ Pro Tips

1. All components in `src/common/components` are auto-registered globally
2. TypeScript is configured with strict mode for better type safety
3. Vuetify theme can be customized in `src/plugins/vuetify.ts`
4. API base URL is set via `VITE_API_BASE_URL` in `.env`

## 🆘 Troubleshooting

### Dependencies won't install

- Make sure Node.js 18+ is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and retry: `npm install`

### Dev server won't start

- Check if port 5173 is available
- Make sure dependencies are installed
- Check for errors in terminal

### TypeScript errors

- These are normal before running `npm install`
- After install, VS Code should recognize all types

---

**Ready to build something awesome! 🚀**
