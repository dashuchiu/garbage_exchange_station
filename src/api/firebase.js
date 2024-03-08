import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2aSI5eE-meoLNXZ4SSPdc99s7FA7IxYE',
  authDomain: 'vue3-auth-5f3bf.firebaseapp.com',
  projectId: 'vue3-auth-5f3bf',
  storageBucket: 'vue3-auth-5f3bf.appspot.com',
  messagingSenderId: '473885486366',
  appId: '1:473885486366:web:055abb80af20fc3fce2d0f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
