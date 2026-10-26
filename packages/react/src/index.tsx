import React from "react";
import { createInputmaskAdapter } from "inputmask";

type Adapter = ReturnType<typeof createInputmaskAdapter>;

export type MaskChangePayload = Parameters<Parameters<Adapter["on"]>[0]>[0];

export type InputmaskOptions = {
  mask?: string | string[] | Record<string, unknown>;
  alias?: string;
  [key: string]: unknown;
};

export interface InputmaskProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange"
> {
  /** Mask or alias shorthand. Merged into `options`. */
  mask?: InputmaskOptions["mask"];
  /** Alias shorthand (for example "email" or "datetime"). Merged into `options`. */
  alias?: string;
  /** Full Inputmask options object. */
  options?: InputmaskOptions;
  /** Controlled model value. Follows input.value, so it is unmasked with autoUnmask. */
  value?: string;
  /** Initial value for the uncontrolled input. */
  defaultValue?: string;
  /** Called on every value change, with the native event and the mask payload. */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    payload: MaskChangePayload
  ) => void;
  /** Ref to the underlying input element. */
  inputRef?: React.Ref<HTMLInputElement>;
  /** Ref to the controller, for imperative access. */
  maskRef?: React.Ref<Adapter | null>;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * Renders an input and applies an Inputmask to it.
 *
 * The input is uncontrolled from React's point of view; `value` is synchronised
 * through the Inputmask API so masking and caret handling stay in control.
 */
export const Inputmask = React.forwardRef<HTMLInputElement, InputmaskProps>(
  function Inputmask(props, forwardedRef) {
    const {
      mask,
      alias,
      options,
      value,
      defaultValue,
      onChange,
      inputRef,
      maskRef,
      ...inputProps
    } = props;

    const elementRef = React.useRef<HTMLInputElement | null>(null);
    const adapterRef = React.useRef<Adapter | null>(null);
    const callbacksRef = React.useRef({ onChange });
    callbacksRef.current = { onChange };

    const resolvedOptions = React.useMemo<InputmaskOptions>(() => {
      const next: InputmaskOptions = { ...options };
      if (mask !== undefined) {
        next.mask = mask;
      }
      if (alias !== undefined) {
        next.alias = alias;
      }
      return next;
    }, [options, mask, alias]);

    const optionsRef = React.useRef(resolvedOptions);
    optionsRef.current = resolvedOptions;

    const assignRef = React.useCallback(
      <T,>(ref: React.Ref<T> | undefined, node: T | null) => {
        if (!ref) {
          return;
        }
        if (typeof ref === "function") {
          ref(node);
        } else {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      },
      []
    );

    const setElementRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        elementRef.current = node;
        assignRef(forwardedRef, node);
        assignRef(inputRef, node);
      },
      [assignRef, forwardedRef, inputRef]
    );

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;
      if (!element) {
        return;
      }
      const adapter = createInputmaskAdapter(element, optionsRef.current);
      const unsubscribe = adapter.on((payload) => {
        const callbacks = callbacksRef.current;
        callbacks.onChange?.(
          payload.event as unknown as React.ChangeEvent<HTMLInputElement>,
          payload
        );
      });
      adapter.mount();
      adapterRef.current = adapter;
      assignRef(maskRef, adapter);

      return () => {
        unsubscribe();
        adapter.destroy();
        adapterRef.current = null;
        assignRef(maskRef, null);
      };
      // Mount once. Option changes are applied by the update effect below.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useIsomorphicLayoutEffect(() => {
      adapterRef.current?.update(resolvedOptions);
    });

    React.useEffect(() => {
      const adapter = adapterRef.current;
      if (!adapter || value === undefined) {
        return;
      }
      if (adapter.getValue() !== value) {
        adapter.setValue(value);
      }
    }, [value]);

    return (
      <input
        ref={setElementRef}
        defaultValue={defaultValue ?? value ?? ""}
        {...inputProps}
      />
    );
  }
);

Inputmask.displayName = "Inputmask";
