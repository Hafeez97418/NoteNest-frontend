import MakeRequests from "../utils/FetchUtils";

const req = new MakeRequests();

async function pageAccess() {
  req.URLObject.endpoint = "/api/v1/user";
  const data = await req.fetchData();
  if (data.status === 401) {
    window.location.replace("/unauthorized.html");
  }
  return data;
}

const user = pageAccess();

export default user;