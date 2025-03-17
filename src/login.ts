// login.ts
import { auth } from "./firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const googleLoginBtn = document.getElementById("googleLoginBtn") as HTMLButtonElement;
const errorMessage = document.getElementById("error-message") as HTMLElement;

loginBtn.addEventListener("click", async () => {
  try {
    const email = emailInput.value;
    const password = passwordInput.value;
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful!");
    window.location.href = "index.html";  // Redirect after login
  } catch (error) {
    errorMessage.textContent = "Login failed! " + error;
  }
});

googleLoginBtn.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log("Google login successful!");
    window.location.href = "index.html";  // Redirect after login
  } catch (error) {
    errorMessage.textContent = "Google login failed!";
  }
});
