import { getAllUsers } from "../services/Admin";
import "../components/Navbar";
import "../components/Footer";
import "../dashboard/userList";
import { createTheme, deleteTheme, ThemeData } from "../services/Themes";
import { Theme } from "../Types";
import { getFormEntries } from "../utils/utils";
import alert from "../components/Alert";

const themeList = document.querySelector("#themeList") as HTMLElement;
const themeForm = document.querySelector(
  "#themeCreationForm"
) as HTMLFormElement;

class AdminPageManager {
  authorize() {
    getAllUsers.then((data) => {
      if (data.success === false) window.location.replace("/unauthorized.html");
    });
  }

  disableSearchBar() {
    const searchBar = document.querySelector("#searchBar") as HTMLElement;
    searchBar.style.display = "none";
  }

  createTheme(themeList: HTMLElement, themeForm: HTMLFormElement) {
    const btn = document.querySelector("#showInputs") as HTMLButtonElement;
    btn.addEventListener("click", () => {
      themeList.classList.toggle("hidden");
      themeForm.classList.toggle("flex");
      themeForm.classList.toggle("hidden");
    });
    themeForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      const entries: Theme = getFormEntries(themeForm);
      const res = await createTheme(entries);
      if (!res.success) {
        alert.FireAlert(res.message);
      } else window.location.reload();
    });
  }

  async listThemes(themeList: HTMLElement) {
    const data = await ThemeData;
    const themesArray: Theme[] = data.themes;
    themeList.innerHTML = "";
    themesArray.map((item) => {
      const elem = `
       <li
            class="stat border-2 rounded-md my-1 p-2 flex justify-between items-center"
            style="background-Color:${item.color};"
          >
            <b>${item.name} ${item.color}</b>
            <button class="btn btn-sm bg-red-700 text-white hover:bg-black" data-theme-id="${item._id}">
              delete
            </button>
          </li>
      
      `;
      themeList.insertAdjacentHTML("beforeend", elem);
    });
    this.deleteThemes("data-theme-id");
  }

  private deleteThemes(btnSelector: string) {
    const btnList = document.querySelectorAll(`[${btnSelector}]`);
    console.log(btnList);

    btnList.forEach((btn) => {
      btn.addEventListener("click", async () => {
        btn.innerHTML = "loading...";
        const res = await deleteTheme(btn.getAttribute(btnSelector) as string);
        if (!res.success) {
          alert.FireAlert(res.message);
          btn.innerHTML = "delete";
        } else window.location.reload();
      });
    });
  }
}

const page = new AdminPageManager();
page.authorize();
page.disableSearchBar();
page.listThemes(themeList);
page.createTheme(themeList, themeForm);
