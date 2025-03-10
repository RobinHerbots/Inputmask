import window from "./global/window";
import Inputmask from "./inputmask";

const document = window.document;

// add check if it is supported by the browser
// integrate shadowroot into maskcope
if (
  document &&
  document.head &&
  document.head.attachShadow &&
  window.customElements &&
  window.customElements.get("input-mask") === undefined
) {
  class InputmaskElement extends HTMLElement {
    constructor() {
      super();
      const attributeNames = this.getAttributeNames(),
        shadow = this.attachShadow({ mode: "closed" });
      this.input = document.createElement("input");
      this.input.type = "text";
      shadow.appendChild(this.input);

      for (const attr in attributeNames) {
        if (Object.prototype.hasOwnProperty.call(attributeNames, attr)) {
          this.input.setAttribute(
            attributeNames[attr],
            this.getAttribute(attributeNames[attr])
          );
        }
      }

      const im = new Inputmask();
      im.dataAttribute = "";
      im.mask(this.input);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      this.input.setAttribute(attrName, newVal);
    }

    // bind value
    get value() {
      return this.input.value;
    }

    set value(value) {
      this.input.value = value;
    }
  }

  window.customElements.define("input-mask", InputmaskElement);
}
