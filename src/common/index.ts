import type { App } from "vue";
import * as componentExports from "./components";

export const components = componentExports;
export * from "./components";

export default function registerCommonComponents(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
