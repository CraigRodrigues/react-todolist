const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
    apiKey: '',
    authDomain: 'react-todo-list-5b50c.firebaseapp.com',
    projectId: 'react-todo-list-5b50c'
});

const auth = firebase.auth();
const db = firebase.firestore();

module.exports = { auth, db };
