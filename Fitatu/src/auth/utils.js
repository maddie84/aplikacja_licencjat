import { auth } from '../firebase-config/firestore';
//import {useHistory, Link} from 'react-router-dom';
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';

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