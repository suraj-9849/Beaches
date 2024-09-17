import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDci-vfJTiCOyCp67rajVI6PGhWdZsFOys",
  authDomain: "beach-auth-3b809.firebaseapp.com",
  databaseURL: "https://beach-auth-3b809-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beach-auth-3b809",
  storageBucket: "beach-auth-3b809.appspot.com",
  messagingSenderId: "233754366931",
  appId: "1:233754366931:web:124c27629fda71353d9526"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const messaging = getMessaging(app);
export { db, auth, app,messaging};
