import MakeRequests from "../utils/FetchUtils"

const req = new MakeRequests();

const getNotes = async () => {
    req.URLObject.endpoint = "/api/v1/notes";
    const res = await req.fetchData();
    console.log(res);
    
    return res;
}

export default getNotes();