import type { Action } from "svelte/action";
import { createInputmaskAdapter } from "inputmask";

export type InputmaskOptions = {
  mask?: string | string[] | Record<string, unknown>;
  alias?: string;
  [key: string]: unknown;
};

export type InputmaskParams = InputmaskOptions | string | string[] | undefined;

function normalize(value: InputmaskParams): InputmaskOptions {
  if (value === undefined || value === null) {
    return {};
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return { mask: value };
  }
  return value;
}

/**
 * Svelte action.
 *
 * ```svelte
 * <input use:inputmask={"+99 999 99 99"} />
 * <input use:inputmask={{ mask: "+99 999 99 99", clearIncomplete: true }} />
 * ```
 */
export const inputmask: Action<HTMLInputElement, InputmaskParams> = (
  node,
  params
) => {
  const adapter = createInputmaskAdapter(node, normalize(params));
  adapter.mount();

  return {
    update(next: InputmaskParams) {
      adapter.update(normalize(next));
    },
    destroy() {
      adapter.destroy();
    }
  };
};
