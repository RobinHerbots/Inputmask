if (FormData.Inputmask === undefined) {
  class FormDataPatch extends FormData {
    constructor(form, submitter) {
      super(form, submitter);

      const entries = this.entries();
      let entry;
      while ((entry = entries.next()).done === false) {
        const fieldName = entry.value[0],
          originalValue = entry.value[1], // Get the original value from FormData
          element = form[fieldName];

        if (
          element &&
          element.inputmask !== undefined &&
          !(originalValue instanceof File)
        ) {
          // Apply masking only if it's not a File and the element has inputmask
          this.set(fieldName, element.value);
        }
      }

      return this;
    }
  }
  FormDataPatch.Inputmask = true;
  // eslint-disable-next-line no-global-assign
  FormData = FormDataPatch;
}
