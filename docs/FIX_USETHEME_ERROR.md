# Correção: useTheme deve ser chamado dentro de setup function

## ❌ Problema

Erro ao carregar a aplicação:

```
[Vuetify] useTheme must be called from inside a setup function
```

**Causa**: A store Pinia estava chamando `useTheme()` do Vuetify durante a inicialização, fora de um componente Vue.

## ✅ Solução Implementada

### 1. Refatoração da Theme Store (`src/stores/theme.ts`)

**Antes:**

```typescript
export const useThemeStore = defineStore("theme", () => {
  const vuetifyTheme = useVuetifyTheme(); // ❌ Erro aqui!
  // ...
});
```

**Depois:**

```typescript
export const useThemeStore = defineStore("theme", () => {
  // ✅ Não chama useTheme aqui
  // Apenas gerencia o estado

  function applyTheme() {
    // Atualiza HTML data attribute
    html.setAttribute("data-theme", currentMode.value);

    // Dispara evento customizado
    window.dispatchEvent(new CustomEvent("theme-changed", {...}));
  }
});
```

### 2. Novo Composable (`src/composables/useThemeSync.ts`)

Criado para sincronizar a store com o Vuetify **dentro de componentes**:

```typescript
export function useThemeSync() {
  const themeStore = useThemeStore();
  const vuetifyTheme = useVuetifyTheme(); // ✅ Chamado dentro do composable

  function syncTheme() {
    vuetifyTheme.global.name.value = themeStore.currentMode;

    // Aplica cores ao Vuetify
    const colors = themeStore.currentColors;
    Object.keys(colors).forEach((key) => {
      vuetifyTheme.themes.value[themeStore.currentMode].colors[key] =
        colors[key];
    });
  }

  // Sincroniza ao montar e quando o tema mudar
  onMounted(() => syncTheme());
  watch(
    () => themeStore.currentMode,
    () => syncTheme()
  );

  return { syncTheme };
}
```

### 3. Atualização do App.vue

```vue
<script setup lang="ts">
import { useThemeSync } from "@/composables/useThemeSync";

// Sincroniza tema com Vuetify
useThemeSync();
</script>
```

## 🔧 Mudanças nos Arquivos

### Arquivos Modificados

1. **`src/stores/theme.ts`**

   - ❌ Removido: `import { useTheme as useVuetifyTheme } from "vuetify"`
   - ❌ Removido: `const vuetifyTheme = useVuetifyTheme()`
   - ✅ Modificado: Função `applyTheme()` agora usa eventos customizados

2. **`src/App.vue`**

   - ✅ Adicionado: `import { useThemeSync } from '@/composables/useThemeSync'`
   - ✅ Adicionado: `useThemeSync()` no setup

3. **`src/stores/__tests__/theme.spec.ts`**
   - ❌ Removido: Mock do Vuetify (não é mais necessário)

### Arquivos Criados

4. **`src/composables/useThemeSync.ts`** (NOVO)
   - Composable para sincronização tema ↔ Vuetify
   - Deve ser usado em componentes raiz (App.vue)

## 🎯 Como Funciona Agora

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│ 1. App Inicia                                               │
│    └─> main.ts carrega themeStore.loadTheme()              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Theme Store Carrega theme.json                           │
│    └─> Define cores, modo (light/dark), logos              │
│    └─> Salva preferência no localStorage                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. App.vue Monta                                            │
│    └─> Chama useThemeSync()                                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. useThemeSync Sincroniza                                  │
│    └─> Acessa useTheme() do Vuetify (agora é seguro!)     │
│    └─> Aplica cores do themeStore ao Vuetify              │
│    └─> Observa mudanças e re-sincroniza                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Usuário Alterna Tema                                     │
│    └─> themeStore.toggleTheme()                            │
│    └─> useThemeSync detecta mudança (watch)               │
│    └─> Re-sincroniza cores com Vuetify                    │
└─────────────────────────────────────────────────────────────┘
```

## ✅ Verificação

### Teste Manual

1. ✅ Servidor inicia sem erros
2. ✅ Página carrega com tema padrão (light)
3. ✅ Toggle de tema funciona (☀️ ↔ 🌙)
4. ✅ Cores do Vuetify mudam corretamente
5. ✅ Preferência persiste no localStorage

### Comandos de Teste

```bash
# Iniciar servidor
npm run dev

# Rodar testes unitários
npm run test:unit

# Rodar testes E2E
npm run test:e2e
```

## 📝 Notas Técnicas

### Por que o erro ocorreu?

O Vuetify usa a Composition API do Vue e seus composables (como `useTheme`) dependem do contexto de execução do Vue. Quando chamado fora de um componente/setup function:

- ❌ Não há instância Vue ativa
- ❌ O sistema de injeção de dependências não funciona
- ❌ `getCurrentInstance()` retorna null

### Por que a solução funciona?

O `useThemeSync` é um composable que:

- ✅ É chamado dentro de `<script setup>` (App.vue)
- ✅ Tem acesso ao contexto Vue
- ✅ Pode usar `useTheme()` do Vuetify com segurança
- ✅ Observa mudanças e sincroniza automaticamente

### Alternativas Consideradas

1. **Usar plugin Vuetify diretamente**
   - ❌ Difícil manter sincronização bidirecional
2. **Injetar Vuetify na store**
   - ❌ Complexo e contra patterns do Pinia
3. **Usar evento global** ✅ (solução escolhida)
   - ✅ Desacoplado
   - ✅ Simples de testar
   - ✅ Segue princípios de composição

## 🚀 Status

**✅ RESOLVIDO** - Aplicação rodando sem erros em `http://localhost:5176/`

Todas as funcionalidades do sistema de temas continuam funcionando:

- ✅ Carregamento do theme.json
- ✅ Toggle light/dark
- ✅ Persistência no localStorage
- ✅ Sincronização com Vuetify
- ✅ Cores dinâmicas aplicadas
