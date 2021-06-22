import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDK20ZwcSvK8oh5tQk6Ld8O44pRggILBO4",
  authDomain: "crwn-db-b4ec9.firebaseapp.com",
  projectId: "crwn-db-b4ec9",
  storageBucket: "crwn-db-b4ec9.appspot.com",
  messagingSenderId: "571827871089",
  appId: "1:571827871089:web:b1670137bbbdec1d536ad0",
  measurementId: "G-39779R544P"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt:' select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;