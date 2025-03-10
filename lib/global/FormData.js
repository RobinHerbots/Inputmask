const FormDataOrig = FormData;

if (FormData.InputMask === undefined) {
  // eslint-disable-next-line no-global-assign
  FormData = function (form) {
    const formData = new FormDataOrig(form),
      entries = formData.entries();
    let entry;
    while ((entry = entries.next()).done === false) {
      const element = document.getElementById(entry.value[0]);
      if (element.inputmask !== undefined) {
        formData.set(entry.value[0], element.value);
      }
    }

    return formData;
  };
  FormData.InputMask = true;
}
