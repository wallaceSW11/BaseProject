# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-10-30

### Added

- **Suporte completo para i18n (Internacionalização)**

  - vue-i18n v9 com Composition API
  - Traduções para pt-BR e en-US
  - Detecção automática do idioma do navegador
  - Persistência da preferência de idioma no localStorage
  - Componente `LanguageSelector` com bandeiras
  - Documentação completa em `docs/I18N.md`

- **Path Aliases Profissionais**

  - Novo alias `@common` para imports mais limpos
  - `@common/*` aponta para `src/common/*`
  - `@common` aponta para `src/common/index.ts`
  - Documentação em `docs/PATH_ALIASES.md`

- **Novos Arquivos**
  - `src/locales/pt-BR.ts` - Traduções em português
  - `src/locales/en-US.ts` - Traduções em inglês
  - `src/locales/index.ts` - Configuração de locales
  - `src/plugins/i18n.ts` - Plugin vue-i18n
  - `src/composables/useLocale.ts` - Composable para gerenciar idioma
  - `src/stores/locale.ts` - Store Pinia para estado do idioma
  - `src/common/components/LanguageSelector.vue` - Seletor de idioma
  - `src/stores/__tests__/locale.spec.ts` - Testes para locale store
  - `docs/I18N.md` - Documentação de internacionalização
  - `docs/PATH_ALIASES.md` - Documentação de path aliases

### Changed

- **Refatoração de Código (Nível Senior)**

  - Removidos comentários desnecessários em todo o projeto
  - Código autoexplicativo com funções nomeadas
  - `src/main.ts` - Extraídas funções `registerPlugins()` e `initializeAndMountApp()`
  - `src/stores/theme.ts` - Extraídas `loadSavedThemePreference()`, `applyThemeToVuetify()`
  - `src/composables/useThemeSync.ts` - Refatorado com funções helper
  - `src/common/utils/api.ts` - Extraídas funções de interceptores

- **Migração de Imports**

  - Todos os imports de `@/common` migrados para `@common`
  - Mantidos imports relativos dentro de `src/common` (evitar circular)
  - Atualizada toda documentação com novos padrões

- **Configuração**

  - `tsconfig.json` - Adicionados paths `@common/*` e `@common`
  - `vite.config.ts` - Adicionado alias `@common`
  - `package.json` - Adicionado vue-i18n v9

- **Views Atualizadas com i18n**

  - `src/App.vue` - Integrado LanguageSelector
  - `src/views/HomeView.vue` - Traduções aplicadas
  - `src/views/DemoView.vue` - Traduções aplicadas

- **Documentação Atualizada**
  - `PROJECT_COMPLETE.md` - Exemplos com novos imports
  - `DEVELOPMENT.md` - Guias atualizados
  - `QUICKSTART.md` - Quick start com i18n
  - `PROJECT_STRUCTURE.md` - Estrutura atualizada

### Benefits

- ✨ **Experiência Multilíngue**: Suporte nativo para múltiplos idiomas
- 📦 **Imports Profissionais**: Código mais limpo e legível
- 🎯 **Código Autoexplicativo**: Sem comentários desnecessários
- 🔧 **Manutenibilidade**: Funções bem nomeadas e organizadas
- 📚 **Documentação Completa**: Guias para todas as funcionalidades

## [1.0.0] - 2025-10-29

### Added

- Initial project setup with Vue 3 + TypeScript + Vite
- Vuetify 3 integration with Material Design Icons
- Vue Router for navigation
- Pinia for state management
- Global component registration system
- Reusable button components (Primary, Secondary, Tertiary, Quartenary)
- IconToolTip component
- ModalBase component for flexible dialogs
- ConfirmDialog with promise-based API
- FloatingNotify for toast notifications
- LoadingOverlay for async operations
- Axios instance with interceptors
- Utility functions (notify, loading, api)
- Vitest configuration for unit testing
- Cypress configuration for E2E testing
- Sample unit tests for components and store
- Sample E2E tests for pages
- PWA support with vite-plugin-pwa
- GitHub Actions workflow for CI/CD
- Comprehensive documentation
- VS Code workspace settings
