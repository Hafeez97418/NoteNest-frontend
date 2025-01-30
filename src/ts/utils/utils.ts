import { Notes } from "../Types";

export function getFormEntries(FormElement: HTMLFormElement) {
  const rawFormData = new FormData(FormElement);
  let obj: any = {};
  for (const [key, value] of rawFormData.entries()) {
    obj[key] = value;
  }
  return obj;
}

export function getTagsFromNotes(notes: Notes[]) {
  const set = new Set<string>();
  notes.map((note) => {
    if (note.tag.length > 0) set.add(note.tag);
  });
  return Array.from(set);
}

export function removeTags(tagName: string) {
  document.querySelectorAll(`[${tagName}]`).forEach((elem) => {
    elem.removeAttribute(tagName);
    elem.classList.remove("bg-blue-700", "text-white");
  });
}
