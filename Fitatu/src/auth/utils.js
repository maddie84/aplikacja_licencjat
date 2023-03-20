import { auth } from '../firebase-config/firestore';
//import {useHistory, Link} from 'react-router-dom';
import {createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const register = (e,email,password,confirmPassword,setHasVerificationWentCorrect) => {
    e.preventDefault();
    //const history = useHistory();
    if(validatePassword(password,confirmPassword)) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            setHasVerificationWentCorrect(true);
            sendEmailVerification(auth.currentUser);
          })
        .catch(err => setHasVerificationWentCorrect(false))
    }
  }
  const validatePassword = (password,confirmPassword) => {
    let isValid = true
    if (password && confirmPassword){
      if (password !== confirmPassword) {
        isValid = false
        alert('Passwords does not match')
      }
    }
    return isValid
  }
  export const logInWithEmailAndPassword = async (e, email, password) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const navigate = useNavigate();
        navigate("/home");
        console.log(userCredential.user);
    })
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };