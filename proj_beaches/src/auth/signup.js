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
const ngo_ref=getDatabase(app);
const ref_ngo=ref(ngo_ref,'NG0');
const auth = getAuth();

if (document.getElementById("reg-button")) {
  const button = document.getElementById("reg-button");
  const role_button=document.getElementById("organizationType");

  button.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById("email-input").value;
    const pass = document.getElementById("password-input").value;

    if(role_button.value=="NGO")
    {
      const org_name=document.getElementById("name-input");
      var details_obj=`${org_name.value}`;
      var details_obj={
        name:org_name.value,
        email:email,
        org_type:role_button.value
      }
      push(ref_ngo,details_obj);
    }
    else
    {
        const org_name=document.getElementById("name-input");
        var details_obj=`${org_name.value}`;
        var details_obj={
          name:org_name.value,
          email:email,
          org_type:role_button.value
        }
        push(ref_ngo,details_obj);
    }

    createUserWithEmailAndPassword(auth, email, pass)
      .then(cred => {
        updateProfile(cred.user, {
          displayName: document.getElementById("name-input").value,
        })
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
