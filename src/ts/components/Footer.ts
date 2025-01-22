const footer = document.querySelector("#Footer") as HTMLElement;

const date = new Date();
footer.innerHTML = `
<div class="footer footer-center bg-blue-500 text-white p-4">
      <aside>
        <p>
          Copyright © <span>${date.getFullYear()}</span> - All right reserved by
          NoteNest
        </p>
      </aside>
    </div>
`;
