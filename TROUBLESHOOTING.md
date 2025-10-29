# 🔧 Troubleshooting - Problemas Comuns

## ❌ Erro 404 - Arquivos `.sass` do Vuetify

### Sintoma

```
GET http://localhost:5173/@id/virtual:plugin-vuetify:components/VBtn/VBtn.sass
net::ERR_ABORTED 404 (Not Found)
```

### Causa

O plugin `vite-plugin-vuetify` estava configurado para carregar estilos SASS individuais.

### ✅ Solução

Ajustado em `vite.config.ts`:

```typescript
vuetify({
  autoImport: true,
  styles: "none", // CSS compilado é importado no plugin
});
```

---

## 🔄 Servidor de Desenvolvimento

### Reiniciar o servidor após mudanças de configuração

```powershell
# Parar o servidor (Ctrl+C)
# Depois:
npm run dev
```

---

## 📦 Problemas com node_modules

Se encontrar erros de módulos não encontrados:

```powershell
# Limpar e reinstalar
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🧪 Testes não executam

### Vitest

```powershell
npm run test:unit
```

### Cypress

```powershell
# Certificar que o dev server está rodando primeiro
npm run dev

# Em outro terminal:
npm run test:e2e:open
```

---

## 🎨 Estilos não carregam

Verifique se `src/plugins/vuetify.ts` contém:

```typescript
import "vuetify/styles";
```

---

## 💡 TypeScript mostra erros antes do npm install

**Normal!** Os erros desaparecem após:

```powershell
npm install
```

---

## 🚀 Build de Produção

```powershell
npm run build
npm run preview
```

Acesse: http://localhost:4173
