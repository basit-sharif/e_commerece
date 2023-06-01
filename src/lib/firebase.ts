import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC3aZmKoOvyVBXXQJ3YRZmutSXSs6l9DkM",
    authDomain: "e-commerce-c7b71.firebaseapp.com",
    projectId: "e-commerce-c7b71",
    storageBucket: "e-commerce-c7b71.appspot.com",
    messagingSenderId: "587504375647",
    appId: "1:587504375647:web:cbf6c2dac29ca247fe88ea"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();