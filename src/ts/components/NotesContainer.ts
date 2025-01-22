import notes from "../services/Notes";
import {
  createNotesForm,
  CreateNotesFormManager,
} from "../components/NotesCreationForm";
import { Notes } from "../Types";
import { Card } from "./Card";
import { NotesUpdateForm } from "./NotesUpdateForm";

class NotesUIManager {
  notesGrid = document.querySelector("#notesGrid") as HTMLElement;
  openBtn = document.querySelector("#sideBarOpenBtnForNotes") as HTMLElement;
  sidebar = document.querySelector("#sidebar-container") as HTMLElement;
  constructor() {
    this.displayNotes();
    this.openBtn.addEventListener("click", () => {
      this.displayNotesForm();
    });
    new NotesUpdateForm();
  }
  async displayNotes() {
    const fetchedNotes = await notes;
    if (fetchedNotes.notes.length < 1) {
      this.notesGrid.innerHTML = "<h2>No notes created yet</h2>";
      return;
    }
    fetchedNotes.notes.map((note: Notes) => {
      this.notesGrid.insertAdjacentHTML("beforeend", Card(note));
    });
  }
  displayNotesForm() {
    this.sidebar.innerHTML = createNotesForm();
    new CreateNotesFormManager();
  }
}

const notesUIManager = new NotesUIManager();
export { notesUIManager };
