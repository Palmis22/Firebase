import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, set, update, ref, get, child, remove, push  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


function useroff() {
    const user = auth.currentUser;
    console.log(user);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid)
            console.log('useris prisijunges')
            console.log(user);
            document.getElementById('user_login_form').style.display = "block";
            document.getElementById('signOut').style.display = "block";
            document.getElementById('ads_form').style.display = "block";
    
            getAuth(ref(database, 'users/' + user.uid))
                .then((snapshot) => {
                    const data = snapshot.val();
                    console.log(data);
                    if (data.role === 'admin') {
                        console.log("tu admin tu gali viska");
    
                    }
                    else {
                        console.log("tu paprastas mirtingasis, gali tik stebeti")
                        const getData = () => {
                        }
                    }
                });
    
        } else {
            // User is signed out
            console.log("atsijunges")
        }
    });
    }
    export {useroff}