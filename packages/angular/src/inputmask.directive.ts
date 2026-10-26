import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { createInputmaskAdapter } from "inputmask";

type Adapter = ReturnType<typeof createInputmaskAdapter>;

export type InputmaskOptions = {
  mask?: string | string[] | Record<string, unknown>;
  alias?: string;
  [key: string]: unknown;
};

export type InputmaskValue = InputmaskOptions | string | string[];

/**
 * Applies an Inputmask to an input and wires it into Angular forms.
 *
 * ```html
 * <input inputmask="+99 999 99 99" />
 * <input [inputmask]="{ mask: '+99 999 99 99', clearIncomplete: true }" />
 * ```
 */
@Directive({
  selector: "[inputmask]",
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputmaskDirective),
      multi: true
    }
  ],
  host: {
    "(blur)": "onTouched()"
  }
})
export class InputmaskDirective
  implements OnInit, OnChanges, OnDestroy, ControlValueAccessor
{
  /** Mask shorthand or a full options object. */
  @Input() inputmask: InputmaskValue = {};

  /** Extra options merged over `inputmask`. */
  @Input() inputmaskOptions?: InputmaskOptions;

  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private adapter: Adapter | null = null;
  private pendingValue: string | null = null;
  private onChange: (value: string) => void = () => undefined;

  onTouched: () => void = () => undefined;

  ngOnInit(): void {
    this.adapter = createInputmaskAdapter(
      this.elementRef.nativeElement,
      this.buildOptions()
    );
    this.adapter.on((payload) => {
      const value = payload.value;
      this.zone.run(() => this.onChange(value));
    });
    this.adapter.mount();

    if (this.pendingValue !== null) {
      this.adapter.setValue(this.pendingValue);
      this.pendingValue = null;
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.adapter?.update(this.buildOptions());
  }

  ngOnDestroy(): void {
    this.adapter?.destroy();
    this.adapter = null;
  }

  writeValue(value: string | null): void {
    if (this.adapter) {
      this.adapter.setValue(value ?? "");
    } else {
      this.pendingValue = value ?? "";
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  private buildOptions(): InputmaskOptions {
    const options = this.inputmaskOptions ?? {};
    if (typeof this.inputmask === "string") {
      return { ...options, mask: this.inputmask };
    }
    if (Array.isArray(this.inputmask)) {
      return { ...options, mask: this.inputmask };
    }
    return { ...this.inputmask, ...options };
  }
}
