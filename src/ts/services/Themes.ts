import MakeRequests from "../utils/FetchUtils"
    const req = new MakeRequests();

const Themes = async () => {
    req.URLObject.endpoint = "/api/v1/theme";
    const res = await req.fetchData();
    return res;
}

const ThemeData = Themes();
export { ThemeData };