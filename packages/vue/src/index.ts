import type { App, Directive } from "vue";
import { createInputmaskAdapter } from "inputmask";

type Adapter = ReturnType<typeof createInputmaskAdapter>;

export type InputmaskOptions = {
  mask?: string | string[] | Record<string, unknown>;
  alias?: string;
  [key: string]: unknown;
};

export type InputmaskBinding = InputmaskOptions | string | string[] | undefined;

const adapters = new WeakMap<HTMLElement, Adapter>();

function normalize(value: InputmaskBinding): InputmaskOptions {
  if (value === undefined || value === null) {
    return {};
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return { mask: value };
  }
  return value;
}

/**
 * Applies an Inputmask to the bound input.
 *
 * ```html
 * <input v-inputmask="'+99 999 99 99'" />
 * <input v-inputmask="{ mask: '+99 999 99 99', clearIncomplete: true }" />
 * ```
 */
export const vInputmask: Directive<HTMLElement, InputmaskBinding> = {
  mounted(el, binding) {
    const adapter = createInputmaskAdapter(el, normalize(binding.value));
    adapter.mount();
    adapters.set(el, adapter);
  },
  updated(el, binding) {
    adapters.get(el)?.update(normalize(binding.value));
  },
  unmounted(el) {
    adapters.get(el)?.destroy();
    adapters.delete(el);
  }
};

/** Plugin form: `app.use(InputmaskPlugin)` registers `v-inputmask`. */
export const InputmaskPlugin = {
  install(app: App) {
    app.directive("inputmask", vInputmask);
  }
};
