# Path Aliases (Import Paths)

Este projeto utiliza path aliases para imports mais limpos e profissionais.

## Aliases Configurados

### `@/*` - Raiz do src

Aponta para `./src/*`

**Uso:**

```typescript
import { useThemeStore } from "@/stores/theme";
import App from "@/App.vue";
import router from "@/router";
```

### `@common/*` - Módulos comuns

Aponta para `./src/common/*`

**Uso:**

```typescript
import { notify } from "@common/utils/notify";
import { loading } from "@common/utils/loading";
import api from "@common/utils/api";
import PrimaryButton from "@common/components/buttons/PrimaryButton.vue";
```

### `@common` - Index do common

Aponta para `./src/common/index.ts`

**Uso:**

```typescript
import registerCommonComponents from "@common/index";
```

## Vantagens

### ✅ Mais Profissional

```typescript
// ❌ Antes (imports relativos)
import { notify } from "../../common/utils/notify";
import PrimaryButton from "../../../common/components/buttons/PrimaryButton.vue";

// ✅ Agora (com aliases)
import { notify } from "@common/utils/notify";
import PrimaryButton from "@common/components/buttons/PrimaryButton.vue";
```

### ✅ Mais Fácil de Manter

- Não quebra quando você move arquivos
- Não precisa contar `../../../`
- Mais fácil de refatorar

### ✅ Mais Legível

- Fica claro de onde vem cada import
- Facilita code review
- Melhor para novos desenvolvedores

## Configuração

Os aliases estão configurados em:

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@common/*": ["./src/common/*"],
      "@common": ["./src/common/index.ts"]
    }
  }
}
```

### Vite (`vite.config.ts`)

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

## Padrões de Uso

### Em Views e Componentes da Aplicação

Use `@common` para imports de componentes e utilitários comuns:

```typescript
import { notify, loading } from "@common/utils";
import { useAppStore } from "@/store";
import { useThemeStore } from "@/stores/theme";
```

### Dentro de `src/common`

Use imports relativos para evitar referências circulares:

```typescript
// src/common/utils/api.ts
import { loading } from "./loading";
import { notify } from "./notify";

// src/common/components/index.ts
export { default as PrimaryButton } from "./buttons/PrimaryButton.vue";
```

### Em Testes

Use os aliases normalmente:

```typescript
import PrimaryButton from "@common/components/buttons/PrimaryButton.vue";
import { useThemeStore } from "@/stores/theme";
```

## Boas Práticas

1. **Prefira aliases sobre imports relativos** em código da aplicação
2. **Use imports relativos dentro de `common`** para evitar problemas circulares
3. **Seja consistente** - não misture estilos de import no mesmo arquivo
4. **Use `@common/utils`** para utilitários compartilhados
5. **Use `@common/components`** para componentes reutilizáveis

## Estrutura Recomendada de Imports

```typescript
// 1. Imports de bibliotecas externas
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

// 2. Imports de @common
import { notify, loading } from "@common/utils";
import PrimaryButton from "@common/components/buttons/PrimaryButton.vue";

// 3. Imports locais do projeto (@/)
import { useAppStore } from "@/store";
import { useThemeStore } from "@/stores/theme";
import type { User } from "@/types/user";

// 4. Imports relativos (apenas quando necessário)
import LocalComponent from "./LocalComponent.vue";
```

## Adicionar Novos Aliases

Se precisar adicionar novos aliases no futuro:

1. Adicione em `tsconfig.json`:

```json
"@novoAlias/*": ["./src/caminho/*"]
```

2. Adicione em `vite.config.ts`:

```typescript
"@novoAlias": fileURLToPath(new URL("./src/caminho", import.meta.url))
```

3. Reinicie o servidor de desenvolvimento
