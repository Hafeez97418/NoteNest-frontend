import user from "../services/isLoggedIn";
import "../components/NotesContainer";
import "../components/Navbar";
import "../components/Footer";
import "../components/TagList";
import "../components/Search";

const userModalBox = document.querySelector("#user_modal_box") as HTMLElement;

user.then((data) => {
  userModalBox.insertAdjacentHTML(
    "afterbegin",
    `<div class="text-lg mb-4 ">
        First name : <span contenteditable  class="focus:outline-none" data-userNameFirst>${data.user.firstName} </span><br/>
         Last Name : <span contenteditable  class="focus:outline-none" data-userNameLast>${data.user.lastName} </span>
        <div>${data.user.email}</div>
        </div>`
  );
});
