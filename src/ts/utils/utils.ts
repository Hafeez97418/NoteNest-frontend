export function getFormEntries(FormElement: HTMLFormElement) {
  const rawFormData = new FormData(FormElement);
  let obj: any = {};
  for (const [key, value] of rawFormData.entries()) {
    obj[key] = value;
  }
  return obj;
}
