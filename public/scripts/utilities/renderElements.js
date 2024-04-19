import { AuthErrorCodes } from "firebase/auth";

const emailErrMsg = document.getElementById("email-err-msg");
const passwordErrMsg = document.getElementById("password-err-msg");
const confirmPasswordErrMsg = document.getElementById(
  "confirm-password-err-msg",
);
const authErrMsg = document.getElementById("err-msg");
const loader = document.getElementById("loader");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const signupBtn = document.getElementById("signup-btn");
const secondaryBtn = document.querySelector(".secondary-button");

const renderFormErrors = (formErrors) => {
  if (formErrors.email) {
    emailErrMsg.style.display = "block";
  } else {
    emailErrMsg.style.display = "none";
  }

  if (formErrors.password) {
    passwordErrMsg.style.display = "block";
  } else {
    passwordErrMsg.style.display = "none";
  }
  if (confirmPasswordErrMsg) {
    if (formErrors?.confirmPassword) {
      confirmPasswordErrMsg.style.display = "block";
    } else {
      confirmPasswordErrMsg.style.display = "none";
    }
  }
};

export const renderAuthErrorMessage = (authError) => {
  let errorMessage = "";
  switch (authError.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      errorMessage = "Email address is already in use.";
      break;
    case AuthErrorCodes.USER_DELETED:
      errorMessage = "User with this email not found.";
      break;
    default:
      errorMessage = authError.code + " : " + authError.message;
  }
  authErrMsg.innerText = errorMessage;
  authErrMsg.style.display = "block";
};

export const showLoader = (show, page) => {
  loader.style.display = show ? "flex" : "none";
  if (secondaryBtn) secondaryBtn.disabled = show;

  if (page === "login") {
    loginBtn.style.display = show ? "none" : "block";
  } else if (page === "signup") {
    signupBtn.style.display = show ? "none" : "block";
  } else {
    logoutBtn.style.display = show ? "none" : "block";
  }
};

export default renderFormErrors;
