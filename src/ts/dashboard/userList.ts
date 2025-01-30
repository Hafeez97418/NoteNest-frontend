import alert from "../components/Alert";
import {
  createAdmin,
  deleteUser,
  demoteAdmin,
  getAllUsers,
} from "../services/Admin";
import { User } from "../Types";
import { openLayer2, userDetails } from "./Layer2";

class UsersCatalog {
  listContainer = document.querySelector("#userList") as HTMLElement;
  form = document.querySelector("#UserSearch") as HTMLFormElement;
  input = document.getElementsByName("email")[0] as HTMLInputElement;
  users: User[] = [];
  constructor(users: []) {
    this.users = users;
    this.addStats(users.length);
    this.insert(this.listContainer, users);
    this.search();
  }

  insert(listContainer: HTMLElement, users: User[]) {
    users.map((user: User) => {
      const { firstName, lastName, email } = user;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `  <li class="stat border-2 rounded-md my-1 cursor-pointer" data-userList="${email}">
              ${firstName} ${lastName ? lastName : ""}
            </li>`
      );
      this.addClickEvent(user, `[data-userList="${email}"]`);
    });
  }
  addClickEvent(user: User, selector: string) {
    const item = this.listContainer.querySelector(selector) as HTMLElement;
    item.addEventListener("click", () => {
      const elem = openLayer2();
      elem.innerHTML = userDetails(user);
      this.userDetailsButtons();
    });
  }
  addStats(totalUsers: number) {
    const stat = document.querySelector("#totalUsers") as HTMLElement;
    stat.innerHTML = `${totalUsers}`;
  }

  search() {
    this.input.addEventListener("input", () => {
      if (this.input.value.length <= 0) {
        this.listContainer.innerHTML = "";
        this.insert(this.listContainer, this.users);
      }
    });
    this.form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const rawFormData = new FormData(this.form);
      const email = rawFormData.get("email");
      if (email === null) {
        return;
      }
      const filterList = this.users.filter((user) => {
        return user.email.match(email as string);
      });
      this.listContainer.innerHTML = "";
      this.insert(this.listContainer, filterList);
    });
  }

  userDetailsButtons() {
    const createAdminBtn = document.querySelector("#createAdmin");
    const demoteAdminBtn = document.querySelector("#demoteAdmin");
    const deleteUserBtn = document.querySelector("#deleteUser");

    const common = async (btn: Element, func: Function) => {
      const prevBtnText = btn.innerHTML;
      btn.innerHTML = "loading...";
      const res = await func(btn.getAttribute("data-user-id") as string);
      if (!res.success) {
        alert.FireAlert(res.message);
        btn.innerHTML = prevBtnText;
        return
      }
      window.location.reload();
    };

    createAdminBtn?.addEventListener("click", async () => {
      common(createAdminBtn, createAdmin);
    });
    demoteAdminBtn?.addEventListener("click", () => {
      common(demoteAdminBtn, demoteAdmin);
    });
    deleteUserBtn?.addEventListener("click", () => {
      common(deleteUserBtn, deleteUser);
    });
  }
}
getAllUsers.then((data) => {
  new UsersCatalog(data.users);
});
