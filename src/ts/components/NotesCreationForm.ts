import { Notes } from "../Types";
import { catchAsyncErrors } from "../utils/Error";
import MakeRequests from "../utils/FetchUtils";
import { addContentToSelect } from "../utils/ui.lib";
import alert from "./Alert";
import { notesUIManager } from "./NotesContainer";

const req = new MakeRequests();
const createNotesForm = (values?: Notes) => {
  return `<section class="mt-4">
  <h1 class="text-lg font-semibold">Create Notes</h1>
  <form id="NotesCreationForm" class="flex flex-col gap-4 mt-6">
    <input
      required
      name="title"
      placeholder="Give a title to your Notes"
      class="input input-sm"
      value="${values ? values.title : ""}"
    />
    <textarea
      required
      name="body"
      placeholder="Write a note"
      class="input input-sm h-28 resize-none"
      
    >${values ? values.body : ""}</textarea>
    <input
      name="tag"
      value="${values ? values.tag : "all"}"
      placeholder="tag your notes default all"
      class="input input-sm"
    />
    <select class="select w-full max-w-xs"  id="selectThemes" name="color" required >
      <option disabled selected>
        select a color for your note
      </option>
    </select>
    <div class="flex gap-4">
    <button class="btn btn-primary bg-blue-500 flex-grow" type="submit">save</button>
    ${
      values
        ? `<button class= "btn btn-error bg-blue-500 text-white"  id="deleteNotes" type="button"> delete </button>`
        : ""
    }
    </div>
  </form>
</section>
`;
};
class CreateNotesFormManager {
  selectElem = document.querySelector("#selectThemes") as HTMLSelectElement;
  form = document.querySelector("#NotesCreationForm") as HTMLFormElement;
  constructor() {
    this.addContentToSelect();
    this.createNotes();
  }
  public async addContentToSelect() {
    addContentToSelect(this.selectElem);
  }
  createNotes() {
    const btn = this.form.querySelector("button") as HTMLButtonElement;
    catchAsyncErrors(async () => {
      this.form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        btn.innerHTML = "loading...";
        const data = new FormData(this.form);
        const body: any = {};
        for (const [key, value] of data.entries()) {
          body[key] = value;
        }
        body.tag = "all";
        req.URLObject.endpoint = "/api/v1/notes";
        req.options.method = "POST";
        req.options.body = body;
        const res = await req.fetchData();
        if (res.success) {
          notesUIManager.displayNotes();
          window.location.reload();
        }
        btn.innerHTML = "save";
        alert.FireAlert(res.message);
      });
    });
  }
}
export { createNotesForm, CreateNotesFormManager };
