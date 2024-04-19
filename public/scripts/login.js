import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import validateForm from "./utilities/validateForm.js";
import renderFormErrors, {
  renderAuthErrorMessage,
  showLoader,
} from "./utilities/renderElements.js";
import { auth } from "./firebase.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");

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
  };
};

const login = async (form) => {
  const userCreds = await signInWithEmailAndPassword(
    auth,
    form.email,
    form.password,
  );
  window.user = userCreds.user;
};

const handleLoginClick = async () => {
  const form = getInputValues();

  const [isError, formErrors] = validateForm("login", form);

  renderFormErrors(formErrors);

  if (!isError) {
    try {
      showLoader(true, "login");
      await login(form);
    } catch (error) {
      renderAuthErrorMessage(error);
      console.error(error);
    }
    showLoader(false, "login");
  }
};

loginButton.addEventListener("click", handleLoginClick);
