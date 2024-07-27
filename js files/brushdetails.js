import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { firebaseConfig } from "./firebase.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postQuery = query(collection(db, "Info2"));
const output = document.getElementById("paintproduct");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
console.log(postId);

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

async function getpaintDetails(id) {
  try {
    const docRef = doc(db, "Info", id);
    const docSnap = await getDoc(docRef);
    const details = document.getElementById("productinfo");
    if (docSnap.exists()) {
      details.innerHTML += `
      <h2 id="title" class="title">${docSnap.data().title}</h2> 
      <h3 id="desc" class="title">${docSnap.data().description}</h3>
      <h4 id="price" class="title">${docSnap.data().price}</h4> 
      <button class="morebtn">Purchase</button>`;
    } else {
      console.log("No such document!");
      document.getElementById("output").innerHTML = "Product not found!";
    }
  } catch (error) {
    console.error("Error fetching:", error);
    document.getElementById("output").innerHTML =
      "Error loading title details.";
  }
}

getpaintDetails(postId);
