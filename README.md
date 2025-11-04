# BaseProject# Vue 3 + TypeScript Project Base

Projeto base para criação de aplicações Vue 3 modernas com TypeScript e Vuetify.A professional starter kit for scalable Vue 3 applications with TypeScript, Vuetify 3, and comprehensive testing setup.

## 📋 Sobre## 🚀 Features

Este é um template pronto para iniciar novos projetos web, incluindo toda a configuração necessária e integração com a [BaseLib](https://github.com/wallaceSW11/BaseLib) - biblioteca de componentes reutilizáveis.- ✅ Vue 3 with Composition API

- ✅ TypeScript for type safety

## ⚡ Tecnologias- ✅ Vuetify 3 with Material Design Icons

- ✅ **White Label Theme System** - Customize colors and branding via JSON

- **Vue 3** - Framework JavaScript progressivo- ✅ **Light/Dark Theme Support** - Automatic theme switching with persistence

- **TypeScript** - Tipagem estática- ✅ Vue Router for navigation

- **Vuetify 3** - Framework de componentes Material Design- ✅ Pinia for state management

- **Pinia** - Gerenciamento de estado- ✅ Axios with interceptors

- **Vue Router** - Roteamento- ✅ Global reusable components

- **Vue I18n** - Internacionalização- ✅ PWA support

- **Vite** - Build tool ultrarrápido- ✅ Vitest for unit testing

- **Vitest** - Testes unitários- ✅ Cypress for E2E testing

- **Cypress** - Testes E2E- ✅ CI/CD with GitHub Actions

## 🚀 Instalação## 📦 Installation

**Este projeto requer PNPM para máxima performance:**```bash

npm install

`bash`

# Instale o pnpm globalmente (se ainda não tiver)

npm install -g pnpm## 🛠️ Development

# Instale as dependências```bash

pnpm installnpm run dev

````



## 💻 Desenvolvimento## 🏗️ Build



```bash```bash

# Iniciar servidor de desenvolvimentonpm run build

pnpm dev```



# Build para produção## 🧪 Testing

pnpm build

### Unit Tests

# Preview do build

pnpm preview```bash

```npm run test:unit          # Run once

npm run test:unit:watch    # Watch mode

## 🧪 Testes```



```bash### E2E Tests

# Testes unitários

pnpm test:unit```bash

npm run test:e2e           # Run headless

# Testes unitários em modo watchnpm run test:e2e:open      # Open Cypress UI

pnpm test:unit:watch```



# Testes E2E## 🎨 White Label Customization

pnpm test:e2e

Easily customize the application's branding without code changes:

# Abrir Cypress UI

pnpm test:e2e:open1. Edit `public/theme.json` to configure:

```

   - Brand colors for light and dark themes

## 📦 BaseLib - Biblioteca de Componentes   - Logo paths for different themes

   - Application name and metadata

Este projeto já vem configurado com a **BaseLib**, uma biblioteca de componentes e utilitários reutilizáveis.

2. Toggle between light and dark themes using the theme switcher in the header

### Componentes Disponíveis

See [White Label Documentation](./docs/WHITE_LABEL.md) for complete customization guide.

Para ver exemplos de uso, acesse `/demo` no projeto rodando.

## 📁 Project Structure

A DemoView.vue contém exemplos práticos de:

- Botões (Primary, Secondary, Tertiary, Quaternary)```

- LanguageSelector (Seletor de idioma com bandeiras)src/

- ThemeToggle (Alternador de tema claro/escuro)├── common/               # Global components and utilities

- LoadingOverlay (Overlay de carregamento)│   ├── components/      # Reusable components

- FloatingNotify (Notificações flutuantes)│   │   ├── buttons/    # Button variants

- ConfirmDialog (Diálogos de confirmação)│   │   └── ...         # Modals, notifications, etc.

- ModalBase (Modal customizável)│   └── utils/          # Utility functions

├── stores/             # Pinia stores

### Como Usar│   ├── app.ts         # Application state

│   └── theme.ts       # Theme management

```typescript├── router/             # Vue Router config

// Importar componentes├── views/              # Page components

import { PrimaryButton, LanguageSelector, ThemeToggle } from '@wallacesw11/base-lib'└── main.ts             # App entry point

```

// Importar utilitários

import { notify, confirm, loading } from '@wallacesw11/base-lib'## 🧩 Global Components



// Usar composablesAll components in `common/components` are automatically registered globally:

import { useLocale, useThemeSync } from '@wallacesw11/base-lib'

```- **Buttons**: PrimaryButton, SecondaryButton, TertiaryButton, QuartenaryButton

- **IconToolTip**: Icon with optional tooltip

### Atualizar BaseLib- **ModalBase**: Flexible modal dialog

- **ConfirmDialog**: Promise-based confirmation dialog

```bash- **FloatingNotify**: Toast notifications

pnpm update @wallacesw11/base-lib- **LoadingOverlay**: Full-screen loading indicator

```- **ThemeToggle**: Light/dark theme switcher



## 📁 Estrutura## 🔧 Utilities



```- **notify(type, title, message)**: Display toast notifications

src/- **loading(show, message?)**: Show/hide loading overlay

├── assets/         # Arquivos estáticos- **api**: Configured Axios instance with interceptors

├── locales/        # Traduções i18n- **useThemeStore**: Access and control theme configuration

├── plugins/        # Configuração de plugins (Vuetify, i18n)

├── router/         # Rotas da aplicação## 📝 License

├── stores/         # Stores Pinia

├── styles/         # Estilos globaisMIT

└── views/          # Páginas da aplicação
    ├── HomeView.vue    # Página inicial
    └── DemoView.vue    # Demonstração de componentes
```

## 🎯 Como Usar Como Base

1. Clone ou baixe este projeto
2. Renomeie a pasta e atualize o `package.json` (nome, versão, etc)
3. Remova exemplos que não precisar da `DemoView.vue`
4. Execute `pnpm install`
5. Comece a desenvolver!

## 📝 Licença

MIT
````
