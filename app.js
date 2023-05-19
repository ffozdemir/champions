import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-67ebc-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const endorsementList = document.getElementById("endorsements-list");
const endorsementEl = document.getElementById("endorsement-el");
const publishBtn = document.getElementById("publish-btn");

publishBtn.addEventListener("click", () => {
  if (!endorsementEl.value) {
    return;
  } else {
    const endorsement = endorsementEl.value;
    push(endorsementListInDB, endorsement);
    clearEndorsmentEl();
  }
});

onValue(endorsementListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearEndorsmentListEl();
    itemsArray.forEach((item) => {
      let key = item[0];
      let value = item[1];
      let li = document.createElement("li");
      li.innerHTML = value;
      endorsementList.appendChild(li);
      let removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.innerHTML = "X";
      li.appendChild(removeBtn);
      removeBtn.addEventListener("click", () => {
        remove(ref(database, "endorsementList/" + key));
      });
    });
  } else {
    endorsementList.innerHTML = "No items here... yet!";
  }
});

function clearEndorsmentListEl() {
  endorsementList.innerHTML = "";
}

function clearEndorsmentEl() {
  endorsementEl.value = "";
}
