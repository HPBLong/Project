import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { firebaseConfig, auth } from "./firebase.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postQuery = query(collection(db, "Info"));
const postQuery2 = query(collection(db, "Info2"));
const output = document.getElementById("brushproduct");
const output2 = document.getElementById("paintproduct");

onSnapshot(postQuery, (snapshot) => {
  output.innerHTML = "";
  snapshot.forEach((doc) => {
    const post = doc.data();
    const postId = doc.id;
    output.innerHTML += `
       <div class="card col-3 mx-auto" style="width: 15%">
           <img
             src="./images/painting-brush-4inch_hubae71684f74698452562c146daae5a96_56954_750x750_resize_q85_box.jpg"
             class="card-img-top"
             alt="..."
           />
           <div class="card-body">
             <h5 class="card-title">${doc.data().title}</h5>
             <p class="card-text">
             ${doc.data().description}
             </p>
             <p class="card-text">
             ${doc.data().price}
             </p>
                <a href="./brushdetails.html?id=${postId}" class="btn btn-primary holder">More Details</a>
           </div>
         </div>`;
  });
});
onSnapshot(postQuery2, (snapshot) => {
  output2.innerHTML = "";
  snapshot.forEach((doc) => {
    const post = doc.data();
    const postId = doc.id;
    output2.innerHTML += `
       <div class="card col-4 mx-auto " style="width: 15%">
           <img
             src="./images/paint buckets.avif"
             class="card-img-top"
             alt="..."
           />
           <div class="card-body">
             <h5 class="card-title">${doc.data().title}</h5>
             <p class="card-text">
             ${doc.data().description}
             </p>
             <p class="card-text">
             ${doc.data().price}
             </p> 
                <a href="./details.html?id=${postId}" class="btn btn-primary holder">More Details</a>
           </div>
         </div>`;
  });
});

const btnLogout = document.getElementById("logout");
btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
