import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC88YQ5Ebqz3nB6aN22oFl2wUFHaThzBLc",
  authDomain: "agcapital-challenge.firebaseapp.com",
  databaseURL: "https://agcapital-challenge-default-rtdb.firebaseio.com",
  projectId: "agcapital-challenge",
  storageBucket: "agcapital-challenge.firebasestorage.app",
  messagingSenderId: "222052615987",
  appId: "1:222052615987:web:7953d6f9007b028f946046"
}


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
// export const auth = getAuth(app)
//
// await signInAnonymously(auth)
