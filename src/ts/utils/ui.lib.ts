import { ThemeData } from "../services/Themes";

async function addContentToSelect(selectElem: HTMLSelectElement) {
  const { themes } = await ThemeData;
  themes.map((theme: any) => {
    selectElem.insertAdjacentHTML(
      "beforeend",
      `<option value="${theme._id}" class="flex items-center justify-between " style="background-color:${theme.color}">
          ${theme.name}
        </option>`
    );
  });
  return themes;
}


export  { addContentToSelect };