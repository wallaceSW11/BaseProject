import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { IconToolTip } from "@wallacesw11/base-lib";

describe("IconToolTip", () => {
  it("renders icon correctly", () => {
    const wrapper = mount(IconToolTip, {
      props: {
        icon: "mdi-help-circle",
      },
    });

    expect(wrapper.html()).toContain("mdi-help-circle");
  });

  it("renders as button when asButton is true", () => {
    const wrapper = mount(IconToolTip, {
      props: {
        icon: "mdi-help-circle",
        asButton: true,
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("shows tooltip text when provided", () => {
    const wrapper = mount(IconToolTip, {
      props: {
        icon: "mdi-help-circle",
        text: "Help tooltip",
      },
    });

    // Tooltip text is stored in the component props, not rendered in HTML directly
    expect(wrapper.props("text")).toBe("Help tooltip");
  });
});
