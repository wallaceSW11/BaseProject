# Estrutura da Biblioteca Common

## 📁 Estrutura de arquivos

```
src/common/
├── README.md                          # Documentação de uso
├── index.ts                           # Exportações centralizadas
│
├── components/                        # Componentes Vue
│   ├── index.ts
│   ├── LoadingOverlay.vue
│   ├── ThemeToggle.vue
│   ├── LanguageSelector.vue
│   ├── buttons/
│   │   ├── PrimaryButton.vue
│   │   ├── SecondaryButton.vue
│   │   ├── TertiaryButton.vue
│   │   └── QuartenaryButton.vue
│   ├── messages/
│   │   ├── ConfirmDialog.vue
│   │   └── FloatingNotify.vue
│   └── modals/
│       └── ModalBase.vue
│
├── composables/                       # Composables Vue
│   ├── index.ts
│   └── useGlobals.ts                 # Hook para acessar utils globais
│
├── plugins/                           # Plugins Vue
│   ├── index.ts
│   └── globals.ts                    # Injeta utils no Vue globalProperties
│
└── utils/                             # Utilitários
    ├── index.ts
    ├── api.ts                        # Cliente Axios configurado
    ├── notify.ts                     # Sistema de notificações
    ├── loading.ts                    # Sistema de loading
    └── confirm.ts                    # Sistema de confirmação
```

## 🎯 Arquivos que PRECISAM existir no projeto destino

### Obrigatórios (devem ser criados/adaptados)

1. **`src/App.vue`**

   ```vue
   <template>
     <FloatingNotify ref="floatingNotifyRef" />
     <LoadingOverlay ref="loadingOverlayRef" />
     <ConfirmDialog ref="confirmDialogRef" />
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

2. **`src/main.ts`**

   ```typescript
   import { createApp } from "vue";
   import { createPinia } from "pinia";
   import { setupCommon } from "@common/index";

   const app = createApp(App);
   const pinia = createPinia();

   app.use(pinia); // ⚠️ DEVE vir ANTES
   setupCommon(app); // Registra common

   app.mount("#app");
   ```

3. **`tsconfig.json`**

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

4. **`vite.config.ts`**

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

## ✅ Checklist de instalação

- [ ] Copiar pasta `src/common/` completa
- [ ] Atualizar `tsconfig.json` com path aliases
- [ ] Atualizar `vite.config.ts` com aliases
- [ ] Adicionar `setupCommon(app)` no `main.ts` (DEPOIS de pinia)
- [ ] Adicionar refs no `App.vue` e registrar no `onMounted`
- [ ] Verificar dependências: `vue`, `pinia`, `vuetify`

## 🔧 Dependências do projeto destino

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

## 🚀 Uso rápido

```vue
<script setup lang="ts">
import { useGlobals } from "@common/index";

const { notify, loading, confirm } = useGlobals();

async function handleAction() {
  const ok = await confirm("Título", "Mensagem");
  if (ok) {
    loading(true, "Processando...");
    // ... ação
    loading(false);
    notify("success", "Sucesso!", "Completado");
  }
}
</script>

<template>
  <PrimaryButton text="Ação" @click="handleAction" />
</template>
```

## 📝 Observações importantes

### O que está autocontido no `common/`

- ✅ Todos os componentes Vue
- ✅ Todos os utilitários e stores
- ✅ Todos os composables
- ✅ Plugin de injeção global
- ✅ Configurações de API (Axios)

### O que precisa ser configurado no projeto

- ⚙️ Path aliases (tsconfig + vite.config)
- ⚙️ Registro no main.ts
- ⚙️ Refs dos componentes no App.vue
- ⚙️ Vuetify (plugin externo)
- ⚙️ Pinia (gerenciador de estado)

### Imports relativos vs absolutos

**Dentro de `src/common/`**: Use imports **relativos**

```typescript
// ✅ Correto (dentro do common)
import { loading } from "./utils/loading";
import ModalBase from "../modals/ModalBase.vue";
```

**Fora de `src/common/`**: Use imports **absolutos**

```typescript
// ✅ Correto (fora do common)
import { useGlobals } from "@common/index";
import { notify, loading } from "@common/utils";
```

## 🎯 Resultado final

Copiar apenas a pasta `common/` + atualizar 4 arquivos de configuração = biblioteca funcionando! 🚀
