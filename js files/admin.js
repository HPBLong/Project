import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const bform = document.getElementById("brushproductForm");
const pform = document.getElementById("paintproductForm");
const brushoutput = document.getElementById("brushoutput");
const paintoutput = document.getElementById("paintoutput");

bform.addEventListener("submit", async (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let price = document.getElementById("brushpricetag").value;
  try {
    const docRef = await addDoc(collection(db, "Info"), {
      title: title,
      description: description,
      price: price,
    });
    getbrushData();
    console.log("submit success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

async function getbrushData() {
  brushoutput.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Info"));
  querySnapshot.forEach((doc) => {
    brushoutput.innerHTML += `
    <div class="card col-3 mx-auto" style="width: 10%">
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
             <button onclick="deleteData1('${doc.id}')">Delete</button>
           </div>
         </div>`;
  });
}

window.deleteData1 = async function (id) {
  try {
    await deleteDoc(doc(db, "Info", id));
    console.log("Delete success");
    location.reload();
  } catch (error) {
    console.error(error);
  }
};

getbrushData();
pform.addEventListener("submit", async (e) => {
  e.preventDefault();
  let title = document.getElementById("painttitle").value;
  let description = document.getElementById("paintdesc").value;
  let price = document.getElementById("paintpricetag").value;
  try {
    const docRef = await addDoc(collection(db, "Info2"), {
      title: title,
      description: description,
      price: price,
    });
    getpaintData();
    console.log("submit success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

async function getpaintData() {
  paintoutput.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Info2"));
  querySnapshot.forEach((doc) => {
    paintoutput.innerHTML += `  
    <div class="card col-3 mx-auto " style="width: 10%">
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
             <button onclick="deleteData2('${doc.id}')">Delete</button>
           </div>
         </div>`;
  });
}
getpaintData();

window.deleteData2 = async function (id) {
  try {
    await deleteDoc(doc(db, "Info2", id));
    console.log("Delete success");
    location.reload();
  } catch (error) {
    console.error(error);
  }
};
