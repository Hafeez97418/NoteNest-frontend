import { User } from "../Types";

export const layer2 = document.querySelector("#Layer2") as HTMLElement;

export const openLayer2 = () => {
  const layerBox = layer2.children[1] as HTMLElement;
  const btn = layer2.firstElementChild as HTMLButtonElement;

  layer2.classList.remove("-translate-y-full");
  layerBox.innerHTML = "";

  btn.addEventListener("click", () => {
    closeLayer2();
  });
  return layerBox;
};

function closeLayer2() {
  layer2.classList.add("-translate-y-full");
}

export function userDetails(user: User) {
  const date = new Date(user.createdAt);
  return `
  <div class="card p-8 shadow-2xl border-2">
        <h2 class="card-title">User Details</h2>
        <div class="card-body px-0">
          <div>
            <span class="text-gray-600 font-light mr-2">first name :</span
            >
            <span>${user.firstName}</span>
          </div>
          <div>
            <span class="text-gray-600 font-light mr-2">last name :</span>
            <span>${user.lastName}</span>
          </div>
          <div>
            <span class="text-gray-600 font-light mr-2">email :</span>
            <span class="font-bold">${user.email}</span>
          </div>
          <div>
            <span class="text-gray-600 font-light mr-2">role :</span
            ><span> ${user.role} </span>
          </div>
          <div>
            <span class="text-gray-600 font-light mr-2">was created on :</span
            >
            <span>
            ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}
            </span>
          </div>
        </div>
        <div>
           ${
             user.role === "user"
               ? `<button class="btn btn-primary" id="createAdmin" data-user-id="${user._id}"
  > create admin </button>`
               : ""
           }
           ${
             user.role === "admin"
               ? `<button class="btn btn-primary" id="demoteAdmin" data-user-id="${user._id}"
  > demote from admin </button>`
               : ""
           }
           ${
             user.role === "user"
               ? `<button class="btn btn-primary" id="deleteUser"
           data-user-id="${user._id}">delete user</button>`
               : ""
           }


        </div>
      </div> 
  `;
}
