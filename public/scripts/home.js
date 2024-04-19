import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { showLoader } from "./utilities/renderElements.js";

const homeMsg = document.getElementById("home-msg");
const userMsg = document.getElementById("user-msg");
const logoutButton = document.getElementById("logout-btn");

const updateUserMessage = (email) => {
  if (email) {
    userMsg.innerText = `Welcome ${email} to BITS Cloud Computing Assignment.`;
  } else {
    userMsg.innerText = "Welcome to the BITS Cloud Computing Assignment.";
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.user = user;
    updateUserMessage(user.email);
  } else {
    window.location.href = "/login";
  }
});

const searchParams = new URLSearchParams(window.location.search);

const account = searchParams.get("account");

if (account === "new") {
  homeMsg.innerText = "Account created successfully.";
}

const handleLogoutClick = async () => {
  showLoader(true, "home");
  await signOut(auth);
  showLoader(false, "home");
};

logoutButton.addEventListener("click", handleLogoutClick);
