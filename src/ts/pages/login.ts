import MakeRequests from "../utils/FetchUtils";
import alert from "../components/Alert";
import { catchAsyncErrors } from "../utils/Error";

abstract class loginFormManager {
  loginForm = document.querySelector("#loginForm") as HTMLFormElement;
  constructor(protected req: MakeRequests) {
    this.changeTranslate();
    this.loginForm.addEventListener("submit", (e) => {
      this.login(e);
    });
  }
  abstract changeTranslate(): void;
  abstract login(e: Event): void;
}

class LoginManager extends loginFormManager {
  changeTranslate(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.loginForm.classList.remove("-translate-y-full");
    });
  }
  async login(e: Event):Promise<boolean> {
    const btn = this.loginForm.getElementsByTagName("button")[0];
    return catchAsyncErrors(async () => {
      e.preventDefault();
      btn.innerHTML = "loading...";
      const rawFormData = new FormData(this.loginForm);

      let body: any = Object.fromEntries(rawFormData.entries());

      this.req.URLObject.endpoint = "/api/v1/user/login";
      this.req.options.method = "POST";
      this.req.options.body = body;
      console.log(this.req.options);

      const res = await this.req.fetchData();
      btn.innerHTML = "submit";
      if (res.success) {
        window.location.replace("/");
        return true;
      }
      alert.FireAlert(res.message);
      return false;
    });
  }
}

new LoginManager(new MakeRequests());
