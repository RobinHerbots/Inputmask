import * as React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Inputmask } from "../src";
import type { MaskChangePayload } from "../src";

type MaskedInput = HTMLInputElement & { inputmask?: unknown };

afterEach(cleanup);

describe("@inputmask/react", () => {
  it("applies the mask to the rendered input", () => {
    const { container } = render(
      <Inputmask mask="999-999" defaultValue="123456" />
    );
    const input = container.querySelector("input") as MaskedInput;

    expect(input.value).toBe("123-456");
    expect(input.inputmask).toBeTruthy();
  });

  it("removes the mask and restores the native input on unmount", () => {
    const { container, unmount } = render(<Inputmask mask="999-999" />);
    const input = container.querySelector("input") as MaskedInput;

    expect(input.inputmask).toBeTruthy();

    unmount();

    expect(input.inputmask).toBeUndefined();
    input.value = "not masked";
    expect(input.value).toBe("not masked");
  });

  it("remasks when the mask option changes and keeps the raw value", () => {
    const { container, rerender } = render(
      <Inputmask mask="999-999" defaultValue="123456" />
    );
    const input = container.querySelector("input") as MaskedInput;
    expect(input.value).toBe("123-456");

    rerender(<Inputmask mask="9999-9999" defaultValue="123456" />);
    // The new mask is longer, so the remaining positions show placeholders.
    // The important part is that the raw value survived the remask.
    expect(input.value.replace(/_/g, "")).toBe("1234-56");
    expect((input.inputmask as { unmaskedvalue: () => string }).unmaskedvalue()).toBe(
      "123456"
    );
  });

  it("can remove and re-add the mask", () => {
    const { container, rerender } = render(
      <Inputmask mask="999-999" defaultValue="123456" />
    );
    const input = container.querySelector("input") as MaskedInput;
    expect(input.inputmask).toBeTruthy();

    rerender(<Inputmask defaultValue="123456" />);
    expect(input.inputmask).toBeUndefined();

    rerender(<Inputmask mask="999-999" defaultValue="123456" />);
    expect(input.inputmask).toBeTruthy();
    expect(input.value).toBe("123-456");
  });

  it("works under React.StrictMode", () => {
    const { container } = render(
      <React.StrictMode>
        <Inputmask mask="999-999" defaultValue="123456" />
      </React.StrictMode>
    );
    const input = container.querySelector("input") as MaskedInput;

    expect(input.value).toBe("123-456");
    expect(input.inputmask).toBeTruthy();
  });

  it("synchronises the controlled value prop", () => {
    const { container, rerender } = render(
      <Inputmask mask="999-999" value="123456" />
    );
    const input = container.querySelector("input") as MaskedInput;
    expect(input.value).toBe("123-456");

    rerender(<Inputmask mask="999-999" value="654321" />);
    expect(input.value).toBe("654-321");
  });

  it("does not emit a change when applying the controlled value", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Inputmask mask="999-999" value="123456" onChange={onChange} />
    );
    onChange.mockClear();

    rerender(<Inputmask mask="999-999" value="654321" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("emits the value payload on input", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Inputmask mask="999-999" onChange={onChange} />
    );
    const input = container.querySelector("input") as MaskedInput;

    input.value = "123456";
    fireEvent.input(input, { target: { value: "123456" } });

    expect(onChange).toHaveBeenCalled();
    const payload = onChange.mock.calls[0][1] as MaskChangePayload;
    expect(payload.value).toBe("123-456");
    expect(payload.maskedValue).toBe("123-456");
    expect(payload.unmaskedValue).toBe("123456");
  });
});
