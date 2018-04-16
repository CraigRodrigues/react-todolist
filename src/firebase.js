const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
    apiKey: 'AIzaSyCGdhuTK5prBXGTfyIJ3wR8p-e2GDX3Aok',
    authDomain: 'react-todo-list-5b50c.firebaseapp.com',
    projectId: 'react-todo-list-5b50c'
});

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };