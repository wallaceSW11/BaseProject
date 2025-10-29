import type { App } from "vue";

// Import all components from the components barrel
import * as componentExports from "./components";

// Create components object from exports
export const components = componentExports;

// Export individual components for direct imports
export * from "./components";

// Register all components globally
export default function registerCommonComponents(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
