import { Notes } from "../Types";
import fetchedNotes from "../services/Notes";
import { Card } from "./Card";
import { NotesUpdateForm } from "./NotesUpdateForm";

class SearchNotes {
  value: string = "";
  notes: Notes[] = [];
  searchBar = document.querySelector("#searchBar") as HTMLInputElement;
  notesGrid = document.querySelector("#notesGrid") as HTMLElement;
  constructor(notes: Notes[]) {
    this.getSearchValue(() => {
      this.displayNotesOnSearchValue();
    });
    this.notes = notes;
  }
  getSearchValue(callback: Function) {
    this.searchBar.addEventListener("input", () => {
      this.value = this.searchBar.value;
      callback();
    });
  }
  displayNotesOnSearchValue() {
    this.notesGrid.innerHTML = "";
    const filteredNotes = this.getSearchValuedNotes();
    filteredNotes.map((note) => {
      this.notesGrid.insertAdjacentHTML("beforeend", Card(note));
    });
    new NotesUpdateForm();
  }
  getSearchValuedNotes() {
    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeValue = escapeRegex(this.value);
    const regex = new RegExp(safeValue, "gi");
    console.log(regex);
    return this.notes.filter((note) => regex.test(note.title));
  }
}

fetchedNotes.then((data) => {
  new SearchNotes(data.notes);
});
