# 📘 Installation Guide: Reusable Library

This guide provides detailed instructions to integrate the `lib` library from this base project into any other Vue 3 project.

---

## 🔧 **Prerequisites**

Your project needs to have the following dependencies installed:

```json
{
  "dependencies": {
    "vue": "^3.x",
    "pinia": "^2.x",
    "vuetify": "^3.x"
  }
}
```

---

## 📦 **Installation Steps**

### **Step 1: Copy Files**

Copy the `lib` folder to your project:

```bash
# Copy from: BaseProject/src/lib
# To: YourProject/src/lib
```

Final structure:

```
your-project/
└── src/
    └── lib/          ← Copied folder
        ├── components/
        ├── composables/
        ├── plugins/
        ├── utils/
        ├── index.ts
        └── README.md
```

### **Step 2: Configure Path Aliases**

#### **In `vite.config.ts`:**

```typescript
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)), // ← Add this
    },
  },
});
```

#### **In `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@lib/*": ["./src/lib/*"], // ← Add this
      "@lib": ["./src/lib/index.ts"] // ← Add this
    }
  }
}
```

### **Step 3: Register in `main.ts`**

```typescript
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import { setupLib } from "@lib/index"; // ← Import

const app = createApp(App);
const pinia = createPinia();

// Register plugins
app.use(pinia); // ← Pinia MUST come first
app.use(router);
app.use(vuetify);
setupLib(app); // ← Register the lib

app.mount("#app");
```

### **Step 4: Configure `App.vue`**

Add the 3 global components in the template and register their references:

```vue
<template>
  <v-app>
    <!-- Your content here -->
    <v-app-bar app>
      <v-app-bar-title>My App</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <!-- ⚠️ REQUIRED: Global components -->
    <FloatingNotify ref="floatingNotifyRef" />
    <LoadingOverlay ref="loadingOverlayRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNotifyStore } from "@lib/utils/notify";
import { useLoadingStore } from "@lib/utils/loading";
import { useConfirmStore } from "@lib/utils/confirm";

const floatingNotifyRef = ref();
const loadingOverlayRef = ref();
const confirmDialogRef = ref();

function registerGlobalComponentRefs() {
  const notifyStore = useNotifyStore();
  const loadingStore = useLoadingStore();
  const confirmStore = useConfirmStore();

  notifyStore.setNotifyRef(floatingNotifyRef.value);
  loadingStore.setLoadingRef(loadingOverlayRef.value);
  confirmStore.setConfirmRef(confirmDialogRef.value);
}

onMounted(registerGlobalComponentRefs);
</script>
```

### **Step 5: Done! Now you can use it**

```vue
<script setup lang="ts">
import { useGlobals } from "@lib/index";

const { notify, loading, confirm } = useGlobals();

async function handleAction() {
  loading(true, "Processing...");

  // Simulate an operation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  loading(false);
  notify("success", "Success!", "Operation completed");
}

async function handleDelete() {
  const confirmed = await confirm(
    "Confirm deletion",
    "Are you sure you want to delete this item?"
  );

  if (confirmed) {
    notify("success", "Deleted", "Item removed successfully");
  }
}
</script>

<template>
  <div>
    <PrimaryButton text="Execute Action" @click="handleAction" />
    <SecondaryButton text="Delete" @click="handleDelete" />
  </div>
</template>
```

---

## 📖 **How to Use**

### **Using Utilities**

```vue
<script setup lang="ts">
import { useGlobals } from "@lib/index";

const { notify, loading, confirm } = useGlobals();

async function fetchData() {
  loading(true, "Loading...");
  try {
    const response = await api.getData();
    notify("success", "Success", "Data loaded");
  } catch (error) {
    notify("error", "Error", "Failed to load data");
  } finally {
    loading(false);
  }
}
</script>
```

### **Using Components**

```vue
<template>
  <div>
    <!-- Components already registered globally -->
    <PrimaryButton text="Save" @click="save" />
    <SecondaryButton text="Cancel" @click="cancel" />
    <TertiaryButton text="Details" @click="showDetails" />
    <QuartenaryButton text="Remove" @click="remove" />

    <!-- Tooltip with icon -->
    <IconToolTip icon="mdi-information" tooltip="Useful information" />

    <!-- Base modal -->
    <ModalBase v-model="showModal" title="My Modal">
      <p>Modal content</p>
    </ModalBase>
  </div>
</template>
```

---

## 🎯 **Included Components**

### **Core Components (always work)**

| Component          | Description         | Usage                                                     |
| ------------------ | ------------------- | --------------------------------------------------------- |
| `PrimaryButton`    | Primary button      | `<PrimaryButton text="Save" @click="save" />`             |
| `SecondaryButton`  | Secondary button    | `<SecondaryButton text="Cancel" @click="cancel" />`       |
| `TertiaryButton`   | Tertiary button     | `<TertiaryButton text="Details" @click="details" />`      |
| `QuartenaryButton` | Quaternary button   | `<QuartenaryButton text="Remove" @click="remove" />`      |
| `IconToolTip`      | Icon with tooltip   | `<IconToolTip icon="mdi-help" tooltip="Help" />`          |
| `ModalBase`        | Reusable modal      | `<ModalBase v-model="show" title="Title">...</ModalBase>` |
| `ConfirmDialog`    | Confirmation dialog | Used via `confirm()`                                      |
| `FloatingNotify`   | Toast notifications | Used via `notify()`                                       |
| `LoadingOverlay`   | Loading overlay     | Used via `loading()`                                      |

### **Optional Components (require external configuration)**

| Component          | Description       | Dependency                                   |
| ------------------ | ----------------- | -------------------------------------------- |
| `ThemeToggle`      | Theme switcher    | `@/stores/theme`                             |
| `LanguageSelector` | Language selector | `@/composables/useLocale`, `@/stores/locale` |

---

## 🛠️ **Troubleshooting**

### **Error: "Cannot find module '@lib'"**

✅ **Solution:** Check that you configured the path aliases correctly in `vite.config.ts` and `tsconfig.json`.

### **Error: "notify is not a function"**

✅ **Solution:** Make sure that:

1. You added the components in `App.vue` (`FloatingNotify`, `LoadingOverlay`, `ConfirmDialog`)
2. You registered the refs in `onMounted`
3. You called `setupLib(app)` in `main.ts` AFTER `app.use(pinia)`

### **Notify/Loading/Confirm don't appear**

✅ **Solution:** Check that you added the 3 components in the `App.vue` template:

```vue
<FloatingNotify ref="floatingNotifyRef" />
<LoadingOverlay ref="loadingOverlayRef" />
<ConfirmDialog ref="confirmDialogRef" />
```

### **Components don't appear globally**

✅ **Solution:** Check that you called `setupLib(app)` in `main.ts` AFTER registering Pinia:

```typescript
app.use(pinia); // ← First
setupLib(app); // ← Then
```

---

## ✅ **Installation Checklist**

- [ ] Copied the `src/lib/` folder
- [ ] Configured path aliases (`@lib`)
- [ ] Added `setupLib(app)` in `main.ts`
- [ ] Configured the 3 components in `App.vue`
- [ ] Tested `notify`, `loading` and `confirm`

---

**Last updated:** October 30, 2025
