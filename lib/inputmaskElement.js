import Inputmask from "./inputmask";

// add check if it is supported by the browser
// integrate shadowroot into maskcope
if (document.head.createShadowRoot || document.head.attachShadow) {
    class InputmaskElement extends HTMLElement {
        constructor() {
            super();
            var attributeNames = this.getAttributeNames(),
                shadow = this.attachShadow({ mode: "closed" }),
                input = document.createElement("input");
            input.type = "text";
            shadow.appendChild(input);

            for (var attr in attributeNames) {
                if (Object.prototype.hasOwnProperty.call(attributeNames, attr)) {
                    input.setAttribute("data-inputmask-" + attributeNames[attr], this.getAttribute(attributeNames[attr]));
                }
            }

            new Inputmask().mask(input);
            input.inputmask.shadowRoot = shadow; //make the shadowRoot available
        }
    }

    customElements.define("input-mask", InputmaskElement);
}