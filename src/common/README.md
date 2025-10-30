# Common Library

Biblioteca de componentes e utilitários reutilizáveis para projetos Vue 3.

## 📦 Como usar em um novo projeto

### 1. Copiar a pasta `common`

```bash
# Copie toda a pasta src/common para seu novo projeto
cp -r src/common /caminho/do/novo/projeto/src/
```

### 2. Configurar Path Aliases

No `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@common/*": ["./src/common/*"],
      "@common": ["./src/common/index.ts"]
    }
  }
}
```

No `vite.config.ts`:

```typescript
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
    },
  },
});
```

### 3. Registrar no `main.ts`

```typescript
import { setupCommon } from "@common/index";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Pinia DEVE vir antes do setupCommon
setupCommon(app); // Registra componentes e plugins globais
```

### 4. Usar em componentes

```vue
<script setup lang="ts">
import { useGlobals } from "@common/index";

const { notify, loading, confirm } = useGlobals();

// Usar diretamente
notify("success", "Título", "Mensagem");
loading(true, "Carregando...");
const confirmed = await confirm("Título", "Mensagem");
</script>

<template>
  <!-- Componentes já registrados globalmente -->
  <PrimaryButton text="Clique aqui" @click="handleClick" />
  <LoadingOverlay />
  <FloatingNotify />
</template>
```

## 📚 Conteúdo da biblioteca

### Componentes Globais (Core - sempre funcionam)

- **Botões**: `PrimaryButton`, `SecondaryButton`, `TertiaryButton`, `QuartenaryButton`
- **Utilitários**: `IconToolTip`
- **Modais**: `ModalBase`, `ConfirmDialog`
- **Mensagens**: `FloatingNotify`
- **Loading**: `LoadingOverlay`

### Componentes Opcionais (requerem configuração externa)

⚠️ **Estes componentes dependem de stores/composables do projeto:**

- **`ThemeToggle`** - Requer `@/stores/theme` configurado
- **`LanguageSelector`** - Requer `@/composables/useLocale` configurado

> Se você não precisa destes componentes, pode removê-los da pasta `common/components/` ou criar as stores necessárias no seu projeto.

### Utilitários (Composables)

```typescript
import { useGlobals } from "@common/index";
const { notify, loading, confirm } = useGlobals();
```

- **`notify(type, title, message)`** - Notificações toast
- **`loading(show, message?)`** - Overlay de loading
- **`confirm(title, message)`** - Diálogo de confirmação (retorna Promise<boolean>)

### Imports Diretos (se preferir)

```typescript
import { notify, loading, confirm } from "@common/utils";
import {
  useNotifyStore,
  useLoadingStore,
  useConfirmStore,
} from "@common/utils";
```

## 🎯 Stores incluídas

- `useNotifyStore` - Gerencia notificações
- `useLoadingStore` - Gerencia estados de loading
- `useConfirmStore` - Gerencia diálogos de confirmação

## ⚙️ Dependências necessárias

Certifique-se que seu projeto tem:

```json
{
  "dependencies": {
    "vue": "^3.x",
    "pinia": "^2.x",
    "vuetify": "^3.x"
  }
}
```

## 🔧 Configuração do App.vue

Para que os utilitários funcionem, você precisa incluir os componentes no App.vue:

```vue
<template>
  <v-app>
    <!-- Seu conteúdo -->
    <router-view />

    <!-- Componentes globais necessários -->
    <FloatingNotify ref="floatingNotifyRef" />
    <LoadingOverlay ref="loadingOverlayRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  useNotifyStore,
  useLoadingStore,
  useConfirmStore,
} from "@common/utils";

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

## 📝 Notas importantes

1. **Pinia** deve ser registrado ANTES de `setupCommon(app)`
2. **Vuetify** é necessário para os componentes funcionarem
3. Os componentes são registrados **globalmente** automaticamente
4. Não precisa importar componentes individuais, use direto no template

## 🚀 Exemplo completo

```vue
<script setup lang="ts">
import { useGlobals } from "@common/index";

const { notify, loading, confirm } = useGlobals();

async function handleDelete() {
  const confirmed = await confirm(
    "Confirmar exclusão",
    "Deseja realmente excluir?"
  );

  if (confirmed) {
    loading(true, "Excluindo...");

    try {
      await api.delete("/item/123");
      notify("success", "Sucesso!", "Item excluído");
    } catch (error) {
      notify("error", "Erro!", "Falha ao excluir");
    } finally {
      loading(false);
    }
  }
}
</script>

<template>
  <PrimaryButton text="Excluir" icon="mdi-delete" @click="handleDelete" />
</template>
```

## 📄 Licença

Livre para uso em seus projetos.
