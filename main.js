// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "./firebase.js";

// Initialize Firebase, database, autentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

console.log(app)
const register_user = document.getElementById('register_user')

// register user function
const register_new_user = (e) => {
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

// prisijungimo funkcija
const loginuser = (e) => {
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
document.getElementById('login_user').addEventListener('click', loginuser)
//userio statuso patikrinimas
const user = auth.currentUser;
console.log(user);
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
      console.log('useris prisijunges')
    } else {
      // User is signed out
      console.log("atsijunges")
    }
  });
  
//atsijungimo funkcija
document.getElementById('user_logOut').addEventListener('click',
    () => {
        signOut(auth).then(() => {
            console.log('sign out succesfull')
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    })