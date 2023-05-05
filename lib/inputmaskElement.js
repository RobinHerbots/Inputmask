import window from "./global/window";
import Inputmask from "./inputmask";

const document = window.document;

// add check if it is supported by the browser
// integrate shadowroot into maskcope
if (document && document.head && document.head.attachShadow && window.customElements && window.customElements.get("input-mask") === undefined) {
    class InputmaskElement extends HTMLElement {
        constructor() {
            super();
            var attributeNames = this.getAttributeNames(),
                shadow = this.attachShadow({mode: "closed"}),
                input = document.createElement("input");
            input.type = "text";
            shadow.appendChild(input);

            for (var attr in attributeNames) {
                if (Object.prototype.hasOwnProperty.call(attributeNames, attr)) {
                    input.setAttribute(attributeNames[attr], this.getAttribute(attributeNames[attr]));
                }
            }

            var im = new Inputmask();
            im.dataAttribute = "";
            im.mask(input);
            input.inputmask.shadowRoot = shadow; //make the shadowRoot available
        }
    }

    window.customElements.define("input-mask", InputmaskElement);
}
