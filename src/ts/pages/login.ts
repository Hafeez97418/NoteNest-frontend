abstract class loginFormManager {
  loginForm = document.querySelector("#loginForm") as HTMLFormElement;
  constructor() {
    this.changeTranslate();
  }
  abstract changeTranslate(): void; // No implementation, must be defined in subclasses
}

class loginUIManager extends loginFormManager {
  changeTranslate(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.loginForm.classList.remove("-translate-y-full");
    });
  }
}

new loginUIManager();
