const Navbar = document.querySelector("#Navbar") as HTMLElement;

Navbar.innerHTML = `
<nav class="navbar bg-blue-500 text-white rounded-xl">
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
            <input type="text" placeholder="Search" class="input w-24 md:w-auto bg-blue-500 placeholder:text-white focus:bg-blue-600" id="searchBar" />
          </div>
          <div class="dropdown dropdown-end ">
            <div
              tabindex="0"
              role="button"
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
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-blue-500 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
         
                <span class="justify-between"
                 onclick="user_modal.showModal()"
                >
                  Profile
                  <span class="badge">New</span>
                </span>
              </li>
              <li><span>Logout</span></li>
            </ul>
          </div>
        </div>
      </nav>
`;
