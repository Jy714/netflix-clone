
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDDpKEb8PQ4Ga9afal2kcQCJdYeqT9P2TM",
  authDomain: "netflix-clone-e65f4.firebaseapp.com",
  projectId: "netflix-clone-e65f4",
  storageBucket: "netflix-clone-e65f4.appspot.com",
  messagingSenderId: "507187854650",
  appId: "1:507187854650:web:dc8ef3ddc4b42674f96403",
  measurementId: "G-Q9BVXXHZ44"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "))
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "))
  }
}

const logout = () => {
  signOut(auth);
}


export { auth, db, login, signup, logout };