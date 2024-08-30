import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDci-vfJTiCOyCp67rajVI6PGhWdZsFOys",
    authDomain: "beach-auth-3b809.firebaseapp.com",
    projectId: "beach-auth-3b809",
    storageBucket: "beach-auth-3b809.appspot.com",
    messagingSenderId: "233754366931",
    appId: "1:233754366931:web:124c27629fda71353d9526",
    databaseURL:"https://beach-auth-3b809-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
  
const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
const ngoRef=ref(db,"NG0");
const auth=getAuth();


auth.onAuthStateChanged(user => {
  if (user) {

    onValue(ngoRef, (snapshot) => {
      let isOrg = false;

      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();

        if (childData.email === user.email) {
          isOrg = true;
          console.log("This is an organisation!");
          //ngo and org code here!
        }
      });

      if (!isOrg) {
        console.log("Not an organisation");
      }
    }, {
      onlyOnce: true
    });
  } else {
    console.log("No user is authenticated");
  }
});


const logout=document.getElementById("logout-button");

logout.addEventListener("click",(event)=>{
    event.preventDefault();
    auth.signOut();
    window.location.href='./login.html';
})





