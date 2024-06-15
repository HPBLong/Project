import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebase.js";

const formLogin = document.getElementById("LoginForm");
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  if (email.length == 0 || password.length == 0) {
    alert("Email or Password mustn't be empty!");
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "../home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
});
