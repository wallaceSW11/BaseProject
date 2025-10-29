# Guia Rápido - White Label e Temas

## 🎨 Personalizando seu Tema

### Passo 1: Editar Cores

Abra o arquivo `public/theme.json` e modifique as cores:

```json
{
  "colors": {
    "light": {
      "primary": "#FF6B6B", // Sua cor primária
      "secondary": "#4ECDC4", // Cor secundária
      "accent": "#45B7D1" // Cor de destaque
    },
    "dark": {
      "primary": "#FF8E8E", // Primária no modo escuro
      "secondary": "#5DE0D6", // Secundária no modo escuro
      "accent": "#67CDE8" // Destaque no modo escuro
    }
  }
}
```

### Passo 2: Atualizar Branding

```json
{
  "customization": {
    "appName": "Minha Empresa",
    "appDescription": "Sistema de Gestão Empresarial",
    "copyrightText": "© 2025 Minha Empresa. Todos os direitos reservados."
  }
}
```

### Passo 3: Adicionar Logos

1. Coloque seus arquivos de logo na pasta `public/`:

   - `public/logo-light.svg` - Logo para tema claro
   - `public/logo-dark.svg` - Logo para tema escuro
   - `public/favicon.ico` - Ícone do navegador

2. Atualize as referências no `theme.json`:

```json
{
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg",
    "favicon": "/favicon.ico"
  }
}
```

### Passo 4: Testar

1. Salve o arquivo `theme.json`
2. Recarregue a página no navegador (F5)
3. Clique no botão de tema (☀️/🌙) no header para alternar
4. Navegue para `/demo` para ver todas as cores aplicadas

## 💡 Exemplos de Uso no Código

### Usando Cores do Tema

```vue
<template>
  <div>
    <!-- Usando cores do Vuetify (automaticamente sincronizadas) -->
    <v-btn color="primary">Botão Primário</v-btn>
    <v-btn color="secondary">Botão Secundário</v-btn>
    <v-btn color="accent">Botão de Destaque</v-btn>

    <!-- Cores de estado -->
    <v-btn color="success">Sucesso</v-btn>
    <v-btn color="error">Erro</v-btn>
    <v-btn color="warning">Aviso</v-btn>
    <v-btn color="info">Informação</v-btn>
  </div>
</template>
```

### Acessando Configurações do Tema

```vue
<template>
  <div>
    <h1>{{ themeStore.appName }}</h1>
    <img :src="themeStore.currentLogo" alt="Logo" />

    <p>Tema atual: {{ themeStore.currentMode }}</p>

    <v-btn @click="themeStore.toggleTheme()"> Alternar Tema </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>
```

### Atualizando Cores Programaticamente

```typescript
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// Atualizar cores do tema atual
themeStore.updateThemeColors({
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
});
```

### Verificando Tema Atual

```typescript
import { useThemeStore } from "@/stores/theme";
import { computed } from "vue";

const themeStore = useThemeStore();

const isDarkMode = computed(() => themeStore.isDark);
const primaryColor = computed(() => themeStore.currentColors.primary);

// Definir tema específico
function setLightMode() {
  themeStore.setTheme("light");
}

function setDarkMode() {
  themeStore.setTheme("dark");
}
```

## 🎯 Cenários Comuns

### 1. Empresa com Cores Específicas

```json
{
  "colors": {
    "light": {
      "primary": "#003366", // Azul corporativo
      "secondary": "#66B2FF", // Azul claro
      "accent": "#FFA000" // Laranja destaque
    }
  }
}
```

### 2. App de Saúde/Bem-estar

```json
{
  "colors": {
    "light": {
      "primary": "#00BFA5", // Verde água
      "secondary": "#80E8D9", // Verde claro
      "accent": "#FF6E40" // Coral
    }
  }
}
```

### 3. Plataforma de E-commerce

```json
{
  "colors": {
    "light": {
      "primary": "#E91E63", // Pink vibrante
      "secondary": "#FF4081", // Pink accent
      "accent": "#FFC107" // Amarelo ouro
    }
  }
}
```

## 🔧 Troubleshooting

### Cores não estão sendo aplicadas?

1. Verifique se o `theme.json` está em `public/`
2. Confirme que os códigos hexadecimais estão corretos (#RRGGBB)
3. Recarregue a página (Ctrl + F5 para hard reload)
4. Verifique o console do navegador para erros

### Logo não aparece?

1. Confirme que o arquivo existe em `public/`
2. Verifique se o caminho no `theme.json` está correto
3. Use caminhos relativos começando com `/`
4. Formatos suportados: SVG, PNG, JPG

### Tema não persiste após reload?

1. Verifique se o localStorage está habilitado no navegador
2. Teste em modo anônimo/privado para descartar extensões
3. Limpe o cache do navegador

### Como resetar para tema padrão?

```typescript
localStorage.removeItem("app-theme");
location.reload();
```

Ou no console do navegador:

```javascript
localStorage.removeItem("app-theme");
location.reload();
```

## 📱 Mobile e Responsividade

O sistema de temas funciona perfeitamente em dispositivos móveis:

- ✅ Toggle de tema funciona em touch screens
- ✅ Cores se adaptam ao modo escuro do sistema (opcional)
- ✅ Logos responsivos com Vuetify
- ✅ Preferência salva por dispositivo

## ♿ Acessibilidade

Ao escolher cores, certifique-se de:

1. **Contraste**: Mínimo 4.5:1 para texto normal
2. **Teste com Simuladores**: Daltonismo e baixa visão
3. **Modo Escuro**: Use tons de cinza, não preto puro (#121212 recomendado)
4. **Ferramentas**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

O arquivo `theme.json` será copiado automaticamente para `dist/`.

### Atualizar Tema em Produção

Você pode atualizar apenas o `theme.json` sem rebuild:

1. Edite `theme.json` no servidor
2. Os usuários verão as novas cores ao recarregar
3. **Não** precisa fazer novo build/deploy

### Múltiplos Ambientes

Você pode ter diferentes `theme.json` por ambiente:

- `theme.json` (produção)
- `theme.dev.json` (desenvolvimento)
- `theme.staging.json` (staging)

E configurar no build pipeline para usar o correto.

## 📚 Recursos Adicionais

- [Documentação Completa](./WHITE_LABEL.md)
- [Exemplos de Temas](./THEME_EXAMPLES.md)
- [Implementação Técnica](./IMPLEMENTACAO_WHITE_LABEL.md)
- [Vuetify Colors](https://vuetifyjs.com/en/styles/colors/)
- [Material Design Color Tool](https://material.io/resources/color/)

## 💬 Perguntas Frequentes

**P: Posso ter mais de 2 temas (light/dark)?**
R: Atualmente suporta 2 temas. Para adicionar mais, precisa estender a store.

**P: As cores se aplicam automaticamente a todos os componentes?**
R: Sim! Todos os componentes Vuetify usam o sistema de cores.

**P: Posso usar gradientes?**
R: Cores de gradiente precisam ser definidas via CSS customizado.

**P: Como faço animações de transição de tema?**
R: Vuetify já aplica transições suaves automaticamente.

**P: Funciona com SSR (Nuxt)?**
R: Sim, mas precisa carregar o tema no servidor também.
