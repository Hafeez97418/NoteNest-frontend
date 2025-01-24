import notes from "../services/Notes";
import { Notes } from "../Types";
import { getTagsFromNotes, removeTags } from "../utils/utils";
import { Card } from "./Card";
import { notesUIManager } from "./NotesContainer";
import { NotesUpdateForm } from "./NotesUpdateForm";

class TagList {
  container = document.querySelector("#categorySection") as HTMLElement;
  notesGrid = document.querySelector("#notesGrid") as HTMLElement;

  notes: Notes[];
  constructor(notes: Notes[]) {
    this.notes = notes;
    this.display();
    const dataTagElem = document.querySelectorAll("[data-tag]");
    this.filter(dataTagElem);
  }

  display() {
    const tags = getTagsFromNotes(this.notes);
    tags.map((tag) => {
      this.container.insertAdjacentHTML(
        "beforeend",
        `<span class="border-2 border-black rounded-xl btn hover:bg-blue-500 hover:text-white" data-tag="${tag}">
          ${tag}
        </span>`
      );
    });
  }

  filter(elements: NodeList) {
    elements.forEach((elem) => {
      elem.addEventListener("click", () => {
        this.TagSpecificNotes(elem as Element, "data-tag-clicked");
      });
    });
  }

  TagSpecificNotes(btn: Element, attribute: string) {
    const tag = btn.getAttribute("data-tag") as string;
    const clicked = btn.getAttribute(attribute);
    this.notesGrid.innerHTML = "";
    removeTags(attribute);
    if (clicked !== null) {
      removeTags(attribute);
      notesUIManager.displayNotes();
    } else {
      btn.classList.add("bg-blue-500", "text-white");
      btn.setAttribute(attribute, "");
      const filteredNotes = this.notes.filter((note) => note.tag === tag);

      filteredNotes.map((note) => {
        this.notesGrid.insertAdjacentHTML("beforeend", Card(note));
      });
    }

    new NotesUpdateForm();
  }
}

notes.then((data) => {
  if (data.success) {
    new TagList(data.notes);
  }
});
