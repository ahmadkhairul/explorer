import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import App from "../App.vue";

describe("App Component", () => {
  it("should render the App component", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          FileExplorer: { template: "<div />" }, // ✅ Use a valid Vue component stub
          FileTree: { template: "<div />" } // ✅ Avoid using `true`
        }
      }
    });
    expect(wrapper.exists()).toBeTruthy(); // ✅ Use `exists()` instead of `toBeTruthy()`
  });
});
