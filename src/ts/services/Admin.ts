import { catchAsyncErrors } from "../utils/Error";
import MakeRequests from "../utils/FetchUtils";

const req = new MakeRequests();

const GetAllUsers = async () =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/users/all";
    const res = await req.fetchData();
    return res;
  });
const getAllUsers = GetAllUsers();

const createAdmin = async (id: string) =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/admin/" + id;
    req.options.method = "POST";
    const res = await req.fetchData();
    return res;
  });

const demoteAdmin = async (id: string) =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/admin/" + id;
    req.options.method = "PATCH";
    const res = await req.fetchData();
    return res;
  });

const deleteUser = async (id: string) =>
  catchAsyncErrors(async () => {
    req.URLObject.endpoint = "/api/v1/user/" + id;
    req.options.method = "DELETE";
    const res = await req.fetchData();
    return res;
  });




export { getAllUsers, createAdmin, demoteAdmin, deleteUser };
