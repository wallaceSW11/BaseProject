import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PrimaryButton from "@common/components/buttons/PrimaryButton.vue";

describe("PrimaryButton", () => {
  it("renders button text correctly", () => {
    const wrapper = mount(PrimaryButton, {
      props: {
        text: "Test Button",
      },
    });
    expect(wrapper.text()).toContain("Test Button");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(PrimaryButton, {
      props: {
        text: "Click Me",
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(PrimaryButton, {
      props: {
        text: "Disabled Button",
        disabled: true,
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("displays icon when icon prop is provided", () => {
    const wrapper = mount(PrimaryButton, {
      props: {
        text: "Icon Button",
        icon: "mdi-check",
      },
    });

    expect(wrapper.html()).toContain("mdi-check");
  });
});
