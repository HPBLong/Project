import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { firebaseConfig } from "./firebase.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postQuery = query(collection(db, "Info2"));
const output = document.getElementById("paintproduct");

onSnapshot(postQuery, (snapshot) => {
  output.innerHTML = "";
  snapshot.forEach((doc) => {
    output.innerHTML += `
         <div class="card col-3 mx-auto border" style="width: 15%">
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
               <a href="./details.html" class="btn btn-primary">More Details</a>
             </div>
           </div>`;
  });
});
