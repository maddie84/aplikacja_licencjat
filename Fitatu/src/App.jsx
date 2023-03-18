import { useState } from 'react'
import './App.css'
import { firestore } from './firebase-config/firestore';
import { doc, setDoc } from "firebase/firestore";
import Auth from './auth';

function App() {
  const [count, setCount] = useState(0)
  const Push = async() => {
    await setDoc(doc(firestore, "board", "tasks"), {
      count
  });
  }
  return (
    <Auth/>
  )
}

export default App
