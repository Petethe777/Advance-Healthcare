import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGaZriXT3WADy2SdOvQTQ1-rFH6Bccfl0",
  authDomain: "gen-lang-client-0104110545.firebaseapp.com",
  projectId: "gen-lang-client-0104110545",
  storageBucket: "gen-lang-client-0104110545.firebasestorage.app",
  messagingSenderId: "629901786587",
  appId: "1:629901786587:web:7da4748fc43c1b67647bfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID
export const db = getFirestore(app, "ai-studio-advancehealth-f1fd8d47-365b-417b-a072-1cf3cbc3fa41");
