import { addContentToSelect } from "../utils/ui.lib";
import notes from "../services/Notes";
import { Notes } from "../Types";
import { createNotesForm } from "./NotesCreationForm";
import { getFormEntries } from "../utils/utils";
import MakeRequests from "../utils/FetchUtils";
import alert from "./Alert";
const req = new MakeRequests();

class NotesUpdateForm {
  sidebar = document.querySelector("#sidebar-container") as HTMLElement;
  constructor() {
    notes.then(() => {
      const noteCards = document.querySelectorAll("[data-notes-id]");
      noteCards.forEach((card) => {
        card.addEventListener("click", () => {
          const id = card.getAttribute("data-notes-id") as string;
          this.displayNotesUpdateForm(id);
        });
      });
    });
  }

  async displayNotesUpdateForm(id: string) {
    let data = await notes;
    data = data.notes as Notes[];
    const note = data.find((note: Notes) => {
      return note._id === id;
    });
    if (note) {
      this.sidebar.innerHTML = createNotesForm(note);
      const selectElem = document.querySelector(
        "#selectThemes"
      ) as HTMLSelectElement;
      addContentToSelect(selectElem);
      selectElem.value = note.color;
      this.UpdateNotes(id);
      this.deleteNotes(id);
    }
  }
  private UpdateNotes(id: string) {
    const updateForm = document.querySelector(
      "#NotesCreationForm"
    ) as HTMLFormElement;
    const btn = updateForm.querySelector("button") as HTMLButtonElement;
    updateForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      btn.innerHTML = "loading...";
      const body = getFormEntries(updateForm);
      req.URLObject.endpoint = "/api/v1/notes/" + id;
      req.options.method = "PUT";
      req.options.body = body;
      const res = await req.fetchData();
      alert.FireAlert(res.message);
      btn.innerHTML = "save";
      window.location.reload();
    });
  }
  private deleteNotes(id: string) {
    const btn = document.querySelector("#deleteNotes") as HTMLButtonElement;
    btn.addEventListener("click", async () => {
      btn.innerHTML = "loading...";
      req.URLObject.endpoint = "/api/v1/notes/" + id;
      req.options.method = "DELETE";
      const { message } = await req.fetchData();
      alert.FireAlert(message);
      window.location.reload();
    });
  }
}

export { NotesUpdateForm };
