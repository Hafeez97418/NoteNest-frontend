import MakeRequests from "../utils/FetchUtils";
import { alignThemesWithNotes, ThemeData } from "./Themes";

const req = new MakeRequests();

const getNotes = async () => {
  req.URLObject.endpoint = "/api/v1/notes";
  const res = await req.fetchData();
  if (res.notes) {
    const fetchedThemes = await ThemeData;
    alignThemesWithNotes(res.notes, fetchedThemes.themes);
  }
  return res;
};

export default getNotes();
