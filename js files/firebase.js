import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHggMOZKTspn5FKC4Fx5SZhPXwmUWdA6M",
  authDomain: "l2s3-a38c0.firebaseapp.com",
  projectId: "l2s3-a38c0",
  storageBucket: "l2s3-a38c0.appspot.com",
  messagingSenderId: "970565908689",
  appId: "1:970565908689:web:14ddce625e08a578f06df0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
