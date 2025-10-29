import { vi } from "vitest";
import { config } from "@vue/test-utils";

// Mock global properties
config.global.mocks = {
  $route: {
    path: "/",
    name: "Home",
  },
  $router: {
    push: vi.fn(),
  },
};

// Add custom matchers or global setup here
