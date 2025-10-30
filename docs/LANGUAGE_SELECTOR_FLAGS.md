# 🌍 Language Selector - Country Flags Guide

## How it Works

The `LanguageSelector` component automatically displays country flags using real SVG images from the `currencies.json` file.

## Behavior

### Closed State (Button)

- Shows **only the flag icon** (24x24px)
- Compact and clean design
- If no flag is found, shows a globe icon (`mdi-earth`)

### Open State (Dropdown)

- Shows **flag + language name**
- Flags are 24x24px with rounded corners
- Better visibility for selection

## Configuration

### Locale Structure

Each locale must have a `countryCode` property:

```typescript
export const availableLocales = [
  { code: "pt-BR", name: "Português (Brasil)", countryCode: "BR" },
  { code: "en-US", name: "English (US)", countryCode: "US" },
  { code: "es-ES", name: "Español", countryCode: "ES" },
  { code: "fr-FR", name: "Français", countryCode: "FR" },
  { code: "de-DE", name: "Deutsch", countryCode: "DE" },
] as const;
```

### Available Country Codes

The `currencies.json` file contains flags for almost all countries. Common examples:

| Country Code | Country        | Language Examples       |
| ------------ | -------------- | ----------------------- |
| `BR`         | Brazil         | Portuguese (pt-BR)      |
| `US`         | United States  | English (en-US)         |
| `GB`         | United Kingdom | English (en-GB)         |
| `ES`         | Spain          | Spanish (es-ES)         |
| `MX`         | Mexico         | Spanish (es-MX)         |
| `FR`         | France         | French (fr-FR)          |
| `DE`         | Germany        | German (de-DE)          |
| `IT`         | Italy          | Italian (it-IT)         |
| `PT`         | Portugal       | Portuguese (pt-PT)      |
| `CN`         | China          | Chinese (zh-CN)         |
| `JP`         | Japan          | Japanese (ja-JP)        |
| `KR`         | South Korea    | Korean (ko-KR)          |
| `RU`         | Russia         | Russian (ru-RU)         |
| `AR`         | Argentina      | Spanish (es-AR)         |
| `CA`         | Canada         | English (en-CA), French |
| `AU`         | Australia      | English (en-AU)         |

### Flag Image Format

- Format: SVG embedded as base64 data URI
- Size: 64x64px original, displayed as 24x24px
- Optimized for web
- No external dependencies

## Fallback Behavior

If a country code is not found in `currencies.json`:

- Shows `mdi-earth` icon instead
- Component continues to work normally
- No errors or broken images

## Examples

### Single Language per Country

```typescript
{ code: "pt-BR", name: "Português (Brasil)", countryCode: "BR" }
```

### Multiple Languages for Same Country

```typescript
{ code: "en-CA", name: "English (Canada)", countryCode: "CA" },
{ code: "fr-CA", name: "Français (Canada)", countryCode: "CA" }
```

### Regions with Different Flags

```typescript
{ code: "zh-CN", name: "简体中文", countryCode: "CN" },
{ code: "zh-TW", name: "繁體中文", countryCode: "TW" }
```

## Customization

### Changing Flag Size

Edit `LanguageSelector.vue`:

```vue
<!-- Button Icon -->
<img
  :src="currentFlag"
  style="width: 32px; height: 32px; border-radius: 4px;"
/>

<!-- Dropdown Icons -->
<img
  :src="getFlagByCountryCode(loc.countryCode)"
  style="width: 28px; height: 28px; border-radius: 4px; margin-right: 12px;"
/>
```

### Removing Border Radius

```vue
style="width: 24px; height: 24px;"
```

### Adding Your Own Flags

If you need a custom flag not in `currencies.json`, you can:

1. Convert your SVG to base64
2. Add to `currencies.json`:

```json
{
  "code": "XXX",
  "name": "Custom Currency",
  "country": "Custom Country",
  "countryCode": "XX",
  "flag": "data:image/svg+xml;base64,YOUR_BASE64_HERE"
}
```

## Technical Details

- **File:** `src/lib/locales/currencies.json`
- **Component:** `src/lib/components/LanguageSelector.vue`
- **Type:** `LocaleOption` in `src/lib/locales/index.ts`
- **Lookup:** Matches `countryCode` property against `currencies.json`

---

**Last updated:** October 30, 2025
