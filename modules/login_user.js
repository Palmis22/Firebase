import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, set, update, ref, get, child, remove, push  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


function loginuser(){
    const login_user = (e) => {
        e.preventDefault();
    
        const user_email = document.getElementById('user_email').value;
        const user_passwd = document.getElementById('user_passwd').value;
    
        signInWithEmailAndPassword(auth, user_email, user_passwd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('sekmingai prisijungiau')
                const login_time = new Date();
                update(ref(database, 'Users/' + user.uid), {
                    timestamp: `${login_time}`
                })
    
    
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    
    }
    document.getElementById('login_user').addEventListener('click', login_user)
    };
    export {loginuser}