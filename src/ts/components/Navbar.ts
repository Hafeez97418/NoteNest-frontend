import { catchAsyncErrors } from "../utils/Error";
import MakeRequests from "../utils/FetchUtils";
import alert from "./Alert";
import user from "../services/isLoggedIn";

const Navbar = document.querySelector("#Navbar") as HTMLElement;
const req = new MakeRequests();

Navbar.innerHTML = `
<nav class="navbar bg-blue-700 text-white rounded-xl">
        <div class="flex navbar-start gap-4">
          <a class="btn btn-ghost text-xl" href="/">NoteNest</a>
          <ul
          class="hidden gap-2 items-center justify-center  md:flex"
        >
          <li><a href="/login.html">login</a></li>
          <li><a href="/register.html">register</a></li>
        </ul>
        </div>
        <div class="flex-none gap-4 navbar-end">
          <div class="form-control ">
            <input type="text" placeholder="Search" class="input w-24 md:w-auto bg-blue-700 placeholder:text-white focus:bg-blue-900" id="searchBar" />
          </div>
          <div class="dropdown dropdown-end ">
           <button
  tabindex="0"
  aria-label="Profile"
  class="btn btn-ghost btn-circle avatar"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
      clip-rule="evenodd"
    />
  </svg>
  <span class="sr-only">Profile</span>
</button>

            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-blue-700 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
         
                <span class="justify-between"
                 onclick="user_modal.showModal()"
                >
                  Profile
                  <span class="badge">New</span>
                </span>
              </li>
              <li id="logoutBtn"><span>Logout</span></li>
            </ul>
          </div>
        </div>
      </nav>
`;

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    const data: boolean = confirm("do you want to logout");
    logout(data, logoutBtn);
  });
});

function logout(shouldLogout: boolean, btn: HTMLElement) {
  if (!shouldLogout) {
    return;
  }
  catchAsyncErrors(async () => {
    btn.innerHTML = "loading...";
    req.URLObject.endpoint = "/api/v1/user/logout";
    req.options.method = "POST";
    const res = await req.fetchData();
    if (!res.success) {
      alert.FireAlert("oops something went wrong please try again");
      return;
    }
    btn.innerHTML = "done";
    window.location.replace("/login.html");
  });
}

const userModalBox = document.querySelector("#user_modal_box") as HTMLElement;
//showing username and email to user
user.then((data) => {
  userModalBox.insertAdjacentHTML(
    "afterbegin",
    `<div class="text-lg mb-4 ">
        <div> ${data.user.firstName} ${
      data.user.lastName ? data.user.lastName : ""
    }</div>
        <div>${data.user.email}</div>
        </div>`
  );
});
