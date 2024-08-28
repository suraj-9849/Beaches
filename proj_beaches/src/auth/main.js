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
const db=getDatabase(app);const auth=getAuth();


const logout=document.getElementById("logout-button");

logout.addEventListener("click",(event)=>{
    event.preventDefault();
    auth.signOut();
    window.location.href='./login.html';
})



