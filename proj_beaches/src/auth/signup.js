import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

if (document.getElementById("reg-button")) {
  const button = document.getElementById("reg-button");

  button.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById("email-input").value;
    const pass = document.getElementById("password-input").value;

    createUserWithEmailAndPassword(auth, email, pass)
      .then(cred => {
        updateProfile(cred.user, {
          displayName: document.getElementById("name-input").value,
        })
      });
  });

  const logout = document.getElementById("logout-button");

  logout.addEventListener('click', (event) => {
    event.preventDefault();
    auth.signOut().then(() => {
      console.log("Signed out!!");
    });
  });
} else if (document.getElementById("login-button")) {
  const login = document.getElementById("login-button");

  login.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById("email-input").value;
    const pass = document.getElementById("password-input").value;

    signInWithEmailAndPassword(auth, email, pass)
      .then(cred => {
        // Reload the user to make sure displayName is fetched properly
        cred.user.reload();
      }).catch(error => {
        console.error("Error logging in:", error);
      });
      
  });
}

auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href='./main.html';
  }
});
