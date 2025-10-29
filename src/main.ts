import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import registerCommonComponents from "./common";
import { useThemeStore } from "./stores/theme";
// Importar CSS customizado por último para sobrescrever Vuetify
import "./styles/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);
registerCommonComponents(app);

// Load theme configuration before mounting
const themeStore = useThemeStore();
themeStore.loadTheme().then(() => {
  app.mount("#app");
});
