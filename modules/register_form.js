import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, set, update, ref, get, child, remove, push  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


function register_new_user(){
    const register_New_user = (e) => {
        e.preventDefault();
    
        // lauku validacija, ar uzpildyti ar teisingai uzpildyti
        const user_email = document.getElementById('user_email').value;
        const user_passwd = document.getElementById('user_passwd').value;
    
        createUserWithEmailAndPassword(auth, user_email, user_passwd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(`new user created ${user}`)
    
                const loginTime = new Date()
                set(ref(database, 'Users/' + user.uid), {
                    email: user_email,
                    role: "simple_user",
                    timestamp: `${loginTime}`
                });
    
    
            })
            .catch((error) => {
                console.log(error);
            });
    }
    register_user.addEventListener('click', register_new_user);
    
    }
    export {register_new_user}

