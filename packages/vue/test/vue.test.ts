import { createApp, defineComponent, h, nextTick, ref, withDirectives } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import { vInputmask } from "../src";

type MaskedInput = HTMLInputElement & { inputmask?: unknown };

let cleanup: (() => void) | undefined;

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
  document.body.innerHTML = "";
});

function mountWithDirective(binding: unknown) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const app = createApp(
    defineComponent({
      render() {
        return withDirectives(h("input", { value: "123456" }), [
          [vInputmask, binding]
        ]);
      }
    })
  );
  app.mount(host);
  cleanup = () => app.unmount();
  return host.querySelector("input") as MaskedInput;
}

describe("@inputmask/vue", () => {
  it("applies a string binding as the mask", () => {
    const input = mountWithDirective("999-999");

    expect(input.value).toBe("123-456");
    expect(input.inputmask).toBeTruthy();
  });

  it("accepts an options object", () => {
    const input = mountWithDirective({ mask: "999-999" });

    expect(input.value).toBe("123-456");
    expect(input.inputmask).toBeTruthy();
  });

  it("remasks when the binding changes", async () => {
    const mask = ref<string | undefined>("999-999");
    const host = document.createElement("div");
    document.body.appendChild(host);
    const app = createApp(
      defineComponent({
        render() {
          return withDirectives(h("input", { value: "123456" }), [
            [vInputmask, mask.value]
          ]);
        }
      })
    );
    app.mount(host);
    cleanup = () => app.unmount();
    const input = host.querySelector("input") as MaskedInput;
    expect(input.value).toBe("123-456");

    mask.value = "9999-9999";
    await nextTick();

    // The new mask is longer, so the remaining positions show placeholders.
    // The important part is that the raw value survived the remask.
    expect(input.value.replace(/_/g, "")).toBe("1234-56");
    expect(
      (input.inputmask as { unmaskedvalue: () => string }).unmaskedvalue()
    ).toBe("123456");
  });

  it("removes the mask on unmount", () => {
    const input = mountWithDirective("999-999");

    cleanup?.();
    cleanup = undefined;

    expect(input.inputmask).toBeUndefined();
    input.value = "not masked";
    expect(input.value).toBe("not masked");
  });
});
