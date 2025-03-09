import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from '../firebase';

// Sign up function
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in function
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out function
export const logoutUser = () => {
  return signOut(auth);
};

// Auth state observer
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
