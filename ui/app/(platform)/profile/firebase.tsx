import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2SJZqzQfLBHG6EeDBjWESJaEpehTgLF4",
  authDomain: "vocal-studio-8e5a9.firebaseapp.com",
  projectId: "vocal-studio-8e5a9",
  storageBucket: "vocal-studio-8e5a9.appspot.com",
  messagingSenderId: "179456207587",
  appId: "1:179456207587:web:876b1fbc41bda29260b3d6",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение экземпляра Storage
const storage = getStorage(app);

export { storage };
