import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "./firebase.js";

const user = auth.currentUser;
const logoutbutton = document.getElementById("LogoutBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email);
  } else {
    console.log("No user");
  }
});

logoutbutton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
