import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlWQsNqBePXPwEb8O4Bz2uC1IS0Fiq1dY",
  authDomain: "inductive-folio-430409-p5.firebaseapp.com",
  databaseURL: "https://inductive-folio-430409-p5-default-rtdb.firebaseio.com",
  projectId: "inductive-folio-430409-p5",
  storageBucket: "inductive-folio-430409-p5.appspot.com",
  messagingSenderId: "15060620632",
  appId: "1:15060620632:web:9891f30686bb50b860412d",
  measurementId: "G-KBCYJC7R9R"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth, app};
