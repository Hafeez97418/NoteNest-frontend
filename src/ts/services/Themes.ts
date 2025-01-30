import { Notes, Theme } from "../Types";
import { catchAsyncErrors } from "../utils/Error";
import MakeRequests from "../utils/FetchUtils";
const req = new MakeRequests();

const Themes = async () =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/theme";
    const res = await req.fetchData();
    return res;
  });

const createTheme = async (body: any) =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/theme/";
    req.options.method = "POST";
    req.options.body = body;
    const res = await req.fetchData();
    return res;
  });

const deleteTheme = async (id: string) =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/theme/" + id;
    req.options.method = "DELETE";
    const res = await req.fetchData();
    return res;
  });

const alignThemesWithNotes = (notes: Notes[], themes: Theme[]) => {
  const themeMap = new Map();
  themes.forEach((theme) => {
    themeMap.set(theme._id, theme.color);
  });
  notes.forEach((note) => {
    const color: string | undefined = themeMap.get(note.color);
    if (!color) {
      note.color = "#fff";
      return;
    }
    note.color = color;
  });
  return notes;
};

const ThemeData = Themes();

export { ThemeData, createTheme, deleteTheme, alignThemesWithNotes };
