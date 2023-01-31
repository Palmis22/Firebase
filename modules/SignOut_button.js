import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, set, update, ref, get, child, remove, push  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function signout(){
    document.getElementById('user_logOut').addEventListener('click',
        () => {
            signOut(auth).then(() => {
                console.log('sign out succesfull')
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        })
    }
    export{signout}