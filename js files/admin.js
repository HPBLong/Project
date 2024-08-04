import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { firebaseConfig } from "./firebase.js";

import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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
    // getbrushData();
    console.log("submit success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

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
    console.log("submit success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const postQuery = query(collection(db, "Info"));
const postQuery2 = query(collection(db, "Info2"));

onSnapshot(postQuery, (snapshot) => {
  brushoutput.innerHTML = "";
  snapshot.forEach((doc) => {
    const post = doc.data();
    const postId = doc.id;

    brushoutput.innerHTML += `
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
             <div class="btn-group">
             <button onclick="deleteData1('${
               doc.id
             }')" type="button" class="btn btn-primary">Delete</button>
             <button onclick="editData1('${
               doc.id
             }')" type="button" class="btn btn-primary">Edit</button>
             </div>
           </div>
         </div>`;
  });
});

onSnapshot(postQuery2, (snapshot) => {
  paintoutput.innerHTML = "";
  snapshot.forEach((doc) => {
    const post = doc.data();
    const postId = doc.id;

    paintoutput.innerHTML += `
          <div class="card col-3 mx-auto" style="width: 15%">
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
             <div class="btn-group">
             <button onclick="deleteData2('${
               doc.id
             }')" type="button" class="btn btn-primary">Delete</button>
             <button onclick="editData2('${
               doc.id
             }')" type="button" class="btn btn-primary">Edit</button>
             </div>
           </div>
         </div>`;
  });
});

window.deleteData1 = async function (id) {
  try {
    await deleteDoc(doc(db, "Info", id));
    console.log("Delete success");
  } catch (error) {
    console.error(error);
  }
};

window.deleteData2 = async function (id) {
  try {
    await deleteDoc(doc(db, "Info2", id));
    console.log("Delete success");
  } catch (error) {
    console.error(error);
  }
};

let click = false;
const formappareance = document.getElementById("brushform");
const formappareance2 = document.getElementById("paintform");

window.editData1 = async function (id) {
  try {
    formappareance.classList.toggle("hide");
    const editbrushform = document.getElementById("editbrushform");
    editbrushform.addEventListener("submit", (e) => {
      e.preventDefault();
      const newtitle = document.getElementById("newtitle").value;
      const newdesc = document.getElementById("newdesc").value;
      const newprice = document.getElementById("newprice").value;
      updateDoc(doc(db, "Info", id), {
        title: newtitle,
        description: newdesc,
        price: newprice,
      });
      editbrushform.classList.toggle("hide");
      console.log("Edit success");
    });
  } catch (error) {
    console.error(error);
  }
};

window.editData2 = async function (id) {
  try {
    formappareance2.classList.toggle("hide");
    const editpaintform = document.getElementById("editpaintform");
    editpaintform.addEventListener("submit", (e) => {
      e.preventDefault();
      const newtitle = document.getElementById("newtitle").value;
      const newdesc = document.getElementById("newdesc").value;
      const newprice = document.getElementById("newprice").value;
      updateDoc(doc(db, "Info2", id), {
        title: newtitle,
        description: newdesc,
        price: newprice,
      });
      formappareance2.classList.toggle("hide");
      console.log("Edit success");
    });
  } catch (error) {
    console.error(error);
  }
};
