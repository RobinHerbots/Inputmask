import type { ActionReturn } from "svelte/action";
import { afterEach, describe, expect, it } from "vitest";

import { inputmask } from "../src";

type MaskedInput = HTMLInputElement & { inputmask?: unknown };
type Action = ActionReturn;

let cleanup: (() => void) | undefined;

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
  document.body.innerHTML = "";
});

function createInput(value = "123456"): MaskedInput {
  const input = document.createElement("input") as MaskedInput;
  input.value = value;
  document.body.appendChild(input);
  return input;
}

describe("@inputmask/svelte", () => {
  it("applies a string param as the mask", () => {
    const input = createInput();
    const action = inputmask(input, "999-999") as Action;
    cleanup = () => action?.destroy();

    expect(input.value).toBe("123-456");
    expect(input.inputmask).toBeTruthy();
  });

  it("applies an options object", () => {
    const input = createInput();
    const action = inputmask(input, { mask: "999-999" }) as Action;
    cleanup = () => action?.destroy();

    expect(input.value).toBe("123-456");
    expect(input.inputmask).toBeTruthy();
  });

  it("updates when params change", () => {
    const input = createInput();
    const action = inputmask(input, { mask: "999-999" }) as Action;
    cleanup = () => action?.destroy();

    action?.update?.({ mask: "9999-9999" });

    // The new mask is longer, so the remaining positions show placeholders.
    // The important part is that the raw value survived the remask.
    expect(input.value.replace(/_/g, "")).toBe("1234-56");
    expect(
      (input.inputmask as { unmaskedvalue: () => string }).unmaskedvalue()
    ).toBe("123456");
  });

  it("removes the mask on destroy", () => {
    const input = createInput();
    const action = inputmask(input, "999-999") as Action;

    action?.destroy?.();

    expect(input.inputmask).toBeUndefined();
    input.value = "not masked";
    expect(input.value).toBe("not masked");
  });
});
