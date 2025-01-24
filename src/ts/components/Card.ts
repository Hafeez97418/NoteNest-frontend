import { Notes } from "../Types";

export function Card(note: Notes) {  
  const date = new Date(note.createdAt as string);
  return `
       <div class="card shadow-xl p-4 border-2 min-h-16">
            <div class="flex-grow">
              <h4 class="card-title uppercase">${note.title}</h4>
              <p class="card-body px-0 py-2">
                ${note.body}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <span>
              ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}</span>
        <label
            data-notes-id="${note._id}"
            for="sidebar"
            class="btn drawer-button btn-sm"
          >
             <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                  />
                </svg>
          </label>
            </div>
          </div>
    `;
}
