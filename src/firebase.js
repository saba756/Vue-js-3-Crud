import { ref, onUnmounted } from "vue";
import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAreZN_w2BN3PX0nlZpDkta3wPv0A_C8IQ",
  authDomain: "vue-3-crud-25aa7.firebaseapp.com",
  projectId: "vue-3-crud-25aa7",
  storageBucket: "vue-3-crud-25aa7.appspot.com",
  messagingSenderId: "401069001558",
  appId: "1:401069001558:web:8d64e3c087472f04b964f7",
  measurementId: "G-523CP5Z2XN",
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = (user) => {
  console.log(user);
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};
