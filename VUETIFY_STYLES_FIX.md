# Configuração Vuetify - Estilos

## Problema Resolvido

Os erros 404 de arquivos `.sass` do Vuetify foram causados pela configuração incorreta do `vite-plugin-vuetify`.

## Solução Aplicada

**Arquivo: `vite.config.ts`**

```typescript
vuetify({
  autoImport: true,
  styles: "none", // Desabilita injeção automática de SASS
});
```

**Arquivo: `src/plugins/vuetify.ts`**

```typescript
import "vuetify/styles"; // Importa estilos CSS compilados
```

## Por que funciona?

- `styles: "none"` - Evita que o plugin tente carregar arquivos `.sass` individuais
- `import "vuetify/styles"` - Importa os estilos CSS já compilados do Vuetify
- Os estilos são carregados uma única vez no bundle principal

## Alternativas (caso precise de customização SASS)

Se você precisar customizar variáveis SASS do Vuetify no futuro:

1. Use `styles: "sass"` no vite.config.ts
2. Instale `sass`: `npm install -D sass`
3. Configure variáveis em `src/styles/settings.scss`

Para este projeto base, usamos os estilos padrão do Vuetify (compilados).
