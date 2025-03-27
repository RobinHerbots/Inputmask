const FormDataOrig = FormData;

if (FormData.InputMask === undefined) {
  // eslint-disable-next-line no-global-assign
  FormData = function (form) {
    const formData = new FormDataOrig(form),
      entries = formData.entries();
    let entry;
    while ((entry = entries.next()).done === false) {
      const fieldName = entry.value[0],
        originalValue = entry.value[1], // Get the original value from FormData
        element = document.getElementById(fieldName);

      if (
        element &&
        element.inputmask !== undefined &&
        !(originalValue instanceof File)
      ) {
        // Apply masking only if it's not a File and the element has inputmask
        formData.set(fieldName, element.value);
      }
    }

    return formData;
  };
  FormData.InputMask = true;
}
