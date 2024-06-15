import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHggMOZKTspn5FKC4Fx5SZhPXwmUWdA6M",
  authDomain: "l2s3-a38c0.firebaseapp.com",
  projectId: "l2s3-a38c0",
  storageBucket: "l2s3-a38c0.appspot.com",
  messagingSenderId: "970565908689",
  appId: "1:970565908689:web:14ddce625e08a578f06df0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const form = document.getElementById("Form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  try {
    const docRef = await addDoc(collection(db, "Info"), {
      title: title,
      description: description,
    });
    getData();
    console.log("submit success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
const output = document.getElementById("output");

async function getData() {
  output.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Info"));
  querySnapshot.forEach((doc) => {
    output.innerHTML += `<h2>${doc.data().title}</h2>
    <p>${doc.data().description}</p>
    <button onclick="deleteData('${doc.id}')">Delete</button>`;
  });
}

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "Info", id));
    console.log("Delete success");
    getData();
  } catch (error) {
    console.error(error);
  }
};

getData();
