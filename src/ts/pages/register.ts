


class RegisterFormManager {
  registerForm = document.querySelector("#registerForm") as HTMLFormElement;
  otpModalDiv = document.querySelector("#otpModalDiv") as HTMLElement;
  otpForm = document.querySelector("#otpForm") as HTMLFormElement;
  constructor() {
    this.registerForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.register(this.registerForm);
    });
    this.otpModalDiv.addEventListener("click", () => this.cancelOtpModalDiv());
    this.otpForm.addEventListener("click", (e) => e.stopPropagation());
    this.otpForm.addEventListener("submit", (e: Event) => {
      this.onOtpSubmit(e);
    });
  }
  private async register(form: HTMLFormElement) {
    const btn = form?.getElementsByTagName("button")[0];
    btn.innerText = "loading...";
    await new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    btn.innerText = "submit";
    this.toggleOtpModalDiv();
  }
  private toggleOtpModalDiv() {
    this.otpModalDiv.classList.toggle("flex");
    this.otpModalDiv.classList.toggle("hidden");
  }
  private cancelOtpModalDiv() {
    this.toggleOtpModalDiv();
  }
  private onOtpSubmit(e: Event) {
    e.preventDefault();
    console.log("submitted with otp");
  }
}

new RegisterFormManager();
