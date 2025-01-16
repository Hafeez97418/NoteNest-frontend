const alertHTML = `
     <div
      id="Alert"
      class="absolute border-2 py-2 px-4 text-xl font-semibold left-0 bottom-0 z-10 rounded-xl bg-white m-4 items-center justify-center gap-4 hidden"
    >
      <p id="alertMessage"></p>
      <div class="hover:text-red-600" id="closeAlert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </div>
    </div>
    `;
document.body.insertAdjacentHTML("beforeend", alertHTML);

class Alert {
  alertElement = document.querySelector("#Alert") as HTMLElement;
  alertMessage = this.alertElement.querySelector(
    "#alertMessage"
  ) as HTMLElement;
  closeAlert = this.alertElement.querySelector("#closeAlert") as HTMLElement;

  constructor() {
    this.closeAlert.addEventListener("click", () => {
      this.alertElement.classList.add("hidden");
    });
  }
  FireAlert(message: string) {
    this.alertMessage.innerText = message;
    this.changeAlertState();
  }

  changeAlertState(element: HTMLElement = this.alertElement) {
    element.classList.toggle("flex", true);
    element.classList.toggle("hidden", false);
  }
}

const alert = new Alert();
export default alert;
