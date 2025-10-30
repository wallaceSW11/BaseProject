# ✅ Revisão Completa - Biblioteca Common

## 🎯 Objetivo Alcançado

A pasta `src/common/` agora é uma **biblioteca autocontida** que pode ser copiada entre projetos com mínima configuração.

## 📦 O que está dentro de `src/common/`

### Estrutura completa

```
src/common/
├── README.md                          ✅ Documentação de uso
├── index.ts                           ✅ Exportações centralizadas
├── components/                        ✅ Componentes Vue
│   ├── index.ts
│   ├── IconToolTip.vue
│   ├── LoadingOverlay.vue
│   ├── ThemeToggle.vue               ⚠️ Requer @/stores/theme
│   ├── LanguageSelector.vue          ⚠️ Requer @/composables/useLocale
│   ├── buttons/
│   │   ├── IconToolTip.vue
│   │   ├── PrimaryButton.vue
│   │   ├── SecondaryButton.vue
│   │   ├── TertiaryButton.vue
│   │   └── QuartenaryButton.vue
│   ├── messages/
│   │   ├── ConfirmDialog.vue
│   │   └── FloatingNotify.vue
│   └── modals/
│       └── ModalBase.vue
├── composables/                       ✅ Composables
│   ├── index.ts
│   └── useGlobals.ts
├── plugins/                           ✅ Plugins Vue
│   ├── index.ts
│   └── globals.ts
└── utils/                             ✅ Utilitários
    ├── index.ts
    ├── api.ts
    ├── notify.ts
    ├── loading.ts
    └── confirm.ts
```

## 🚀 Como usar em outro projeto (3 passos)

### Passo 1️⃣: Copiar pasta

```bash
cp -r src/common /novo-projeto/src/
```

### Passo 2️⃣: Configurar aliases (2 arquivos)

**tsconfig.json**

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

**vite.config.ts**

```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
    },
  },
});
```

### Passo 3️⃣: Registrar no app (2 arquivos)

**main.ts**

```typescript
import { setupCommon } from "@common/index";

const app = createApp(App);
app.use(createPinia()); // ⚠️ ANTES do setupCommon
setupCommon(app); // Registra tudo
```

**App.vue**

```vue
<template>
  <v-app>
    <router-view />

    <!-- Componentes necessários -->
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
  useNotifyStore().setNotifyRef(floatingNotifyRef.value);
  useLoadingStore().setLoadingRef(loadingOverlayRef.value);
  useConfirmStore().setConfirmRef(confirmDialogRef.value);
}

onMounted(registerGlobalComponentRefs);
</script>
```

## ✅ Checklist de Instalação

- [ ] Copiar pasta `src/common/`
- [ ] Atualizar `tsconfig.json` paths
- [ ] Atualizar `vite.config.ts` alias
- [ ] Adicionar `setupCommon(app)` em `main.ts`
- [ ] Adicionar refs em `App.vue`
- [ ] Verificar dependências instaladas

## 📋 Dependências Necessárias

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "pinia": "^2.1.0",
    "vuetify": "^3.5.0",
    "axios": "^1.6.0"
  }
}
```

## 💡 Uso nos Componentes

```vue
<script setup lang="ts">
import { useGlobals } from "@common/index";

const { notify, loading, confirm } = useGlobals();

async function handleAction() {
  const ok = await confirm("Confirmar?", "Tem certeza?");

  if (ok) {
    loading(true, "Processando...");
    try {
      // ação
      notify("success", "Sucesso!", "Completado");
    } finally {
      loading(false);
    }
  }
}
</script>

<template>
  <!-- Componentes já registrados globalmente -->
  <PrimaryButton text="Ação" icon="mdi-check" @click="handleAction" />
  <SecondaryButton text="Cancelar" />
  <IconToolTip icon="mdi-help" text="Ajuda" />
</template>
```

## ⚠️ Componentes Opcionais

Estes componentes possuem dependências externas:

- **ThemeToggle** → Requer `@/stores/theme`
- **LanguageSelector** → Requer `@/composables/useLocale`

**Opções:**

1. Criar as stores necessárias no novo projeto
2. Remover estes componentes da pasta `common/components/`
3. Comentar no `common/components/index.ts`

## 🎯 Resultado

✅ **1 pasta** para copiar  
✅ **4 arquivos** para configurar  
✅ **Pronto para usar!**

## 📚 Documentação Completa

Consulte:

- `src/common/README.md` - Documentação da biblioteca
- `docs/COMMON_LIBRARY.md` - Estrutura detalhada
- `docs/PATH_ALIASES.md` - Guia de aliases
