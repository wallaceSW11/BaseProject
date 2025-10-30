import type { App } from "vue";
import * as componentExports from "./components";
import globalsPlugin from "./plugins";

export const components = componentExports;
export * from "./components";
export * from "./utils";
export * from "./composables";
export { default as globalsPlugin } from "./plugins";

export default function registerCommonComponents(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}

export function registerCommonPlugins(app: App) {
  app.use(globalsPlugin);
}

export function setupCommon(app: App) {
  registerCommonComponents(app);
  registerCommonPlugins(app);
}
