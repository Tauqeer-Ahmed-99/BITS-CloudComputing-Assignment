import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import renderFormErrors, {
  renderAuthErrorMessage,
  showLoader,
} from "./utilities/renderElements.js";
import validateForm from "./utilities/validateForm.js";
import { auth } from "./firebase.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const signupButton = document.getElementById("signup-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.user = user;
    window.location.href = "/home";
  }
});

const getInputValues = () => {
  return {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: confirmPasswordInput.value.trim(),
  };
};

const signup = async (form) => {
  const userCreds = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password,
  );

  window.user = userCreds.user;
};

const handleSignupClick = async () => {
  const form = getInputValues();

  const [isError, formErrors] = validateForm("signup", form);

  renderFormErrors(formErrors);

  if (!isError) {
    try {
      showLoader(true, "signup");
      await signup(form);
      window.location.href = "/home?account=new";
    } catch (error) {
      renderAuthErrorMessage(error);
      console.error(error);
    }
    showLoader(false, "signup");
  }
};

signupButton.addEventListener("click", handleSignupClick);
