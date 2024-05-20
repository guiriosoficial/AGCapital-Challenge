import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agcapital-challenge.firebaseapp.com",
  databaseURL: "https://agcapital-challenge-default-rtdb.firebaseio.com",
  projectId: "agcapital-challenge",
  storageBucket: "agcapital-challenge.appspot.com",
  messagingSenderId: "222052615987",
  appId: "1:222052615987:web:7953d6f9007b028f946046"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db