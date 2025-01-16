import { catchAsyncErrors } from "../utils/Error"; // Utility to handle async errors gracefully
import MakeRequests from "../utils/FetchUtils"; // Custom class to make API requests
import alert from "../components/Alert"; // Custom alert component for user notifications

// Abstract base class for managing registration form elements and requests
abstract class RegisterFormManager {
  registerForm = document.querySelector("#registerForm") as HTMLFormElement; // Registration form element
  otpModalDiv = document.querySelector("#otpModalDiv") as HTMLElement; // OTP modal container
  otpForm = document.querySelector("#otpForm") as HTMLFormElement; // OTP form element
  req = new MakeRequests(); // Instance of MakeRequests for API calls
  user: any = {}; // User object to store user data temporarily
}

// Class responsible for handling registration and OTP-related business logic
class RegisterFeatureManager extends RegisterFormManager {
  // Method to verify user credentials with the server
  verifyUser(credentials: any): Promise<boolean> {
    return catchAsyncErrors(async () => {
      // Set request endpoint and method
      this.req.URLObject.endpoint = "/api/v1/user/verify";
      this.req.options.method = "POST";
      this.req.options.body = credentials;

      // Make the API call and handle the response
      const res = await this.req.fetchData();
      if (res.success) {
        this.user = res.user; // Save user data if verification succeeds
        return true;
      }
      alert.FireAlert(res.message); // Show alert if verification fails
      return false;
    });
  }

  // Method to submit OTP and complete user registration
  async submitOtpAndSignup(credentials: any): Promise<boolean> {
    return catchAsyncErrors(async () => {
      // Set request endpoint and method
      this.req.URLObject.endpoint = "/api/v1/user/register";
      this.req.options.method = "POST";
      this.req.options.body = { user: this.user, ...credentials };

      // Make the API call and handle the response
      const res = await this.req.fetchData();
      if (res.success) {
        return true; // Registration successful
      }
      alert.FireAlert(res.message); // Show alert if registration fails
      return false;
    });
  }
}

// Class for managing UI interactions for the registration form and OTP modal
class RegisterFormUIManager extends RegisterFeatureManager {
  constructor() {
    super();

    // Add submit event listener to the registration form
    this.registerForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const formData = new FormData(this.registerForm); // Collect form data
      let credentials: any = {};
      for (const [key, value] of formData.entries()) {
        credentials[key] = value; // Convert form data to an object
      }
      this.register(this.registerForm, credentials); // Handle registration
    });

    // Add click event listener to close OTP modal
    this.otpModalDiv.addEventListener("click", () => this.cancelOtpModalDiv());

    // Prevent modal from closing when clicking inside the OTP form
    this.otpForm.addEventListener("click", (e) => e.stopPropagation());

    // Add submit event listener to the OTP form
    this.otpForm.addEventListener("submit", (e: Event) => {
      this.onOtpSubmit(e); // Handle OTP form submission
    });
  }

  // Handles user registration logic
  private async register(form: HTMLFormElement, credentials: any) {
    const btn = form?.getElementsByTagName("button")[0]; // Get the submit button
    btn.innerText = "loading..."; // Show loading text during API call

    // Verify user credentials
    const response = await this.verifyUser(credentials);
    btn.innerText = "submit"; // Reset button text

    if (response) {
      this.toggleOtpModalDiv(); // Show OTP modal if verification succeeds
    }
  }

  // Toggles the visibility of the OTP modal
  private toggleOtpModalDiv() {
    this.otpModalDiv.classList.toggle("flex");
    this.otpModalDiv.classList.toggle("hidden");
  }

  // Cancels and hides the OTP modal
  private cancelOtpModalDiv() {
    this.toggleOtpModalDiv();
  }

  // Handles OTP form submission
  private async onOtpSubmit(e: Event) {
    e.preventDefault();
    const btn = this.otpForm.getElementsByTagName("button")[0]; // Get the submit button
    btn.innerHTML = "loading..."; // Show loading text during API call

    // Collect OTP form data
    const formData = new FormData(this.otpForm);
    let credentials: any = {};
    for (const [key, value] of formData.entries()) {
      credentials[key] = value; // Convert form data to an object
    }

    // Submit OTP and complete signup
    const res = await this.submitOtpAndSignup(credentials);
    if (res) {
      window.location.replace("/"); // Redirect to home page on success
    }
    btn.innerHTML = "submit"; // Reset button text
  }
}

// Initialize the UI manager for the registration form
new RegisterFormUIManager();
