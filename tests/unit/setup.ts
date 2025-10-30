import { vi } from "vitest";
import { config } from "@vue/test-utils";

config.global.mocks = {
  $route: {
    path: "/",
    name: "Home",
  },
  $router: {
    push: vi.fn(),
  },
};
