import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOPRzBZ8q98DWH6X6Tf3xWe7gDtQWAGwk",
  authDomain: "handymanbooking-57dee.firebaseapp.com",
  projectId: "handymanbooking-57dee",
  storageBucket: "handymanbooking-57dee.firebasestorage.app",
  messagingSenderId: "23905346581",
  appId: "1:23905346581:web:ee8c07621d993f93345a1c",
  measurementId: "G-9GFQ76E91Y"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

import { getDocs, collection } from "firebase/firestore";

async function testFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    querySnapshot.forEach((doc) => {
      console.log("Document data:", doc.data());
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
}

testFirestore();
// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
