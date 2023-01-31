// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, set, update, ref, get, child, remove, push  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "./firebase.js";


import { useroff } from "./UserOFF.js";



import { register_new_user } from "./register_form.js";
import { loginuser } from "./login_user.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in')
        
        useron()
    } 
    
    else {
        console.log('User is signed out')
        document.getElementById('login_user').addEventListener('click', login_user)
        register_user.addEventListener('click', register_new_user);
        useroff()
    }
});
