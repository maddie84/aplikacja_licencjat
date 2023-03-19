import React, { useState } from 'react';
import RegisterPopup from './register-popup';
import { register } from './utils';
// kod, który piszę jest semantyczny co oznacza, że jest przyjazny osobom niepełnosprawnym, które wykorzystują narzędzia
//potrzebne do odczytu ekranu, z którymi nasz kod jest kompatybilny 
const Auth = () => {
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [email,setEmail] = useState("");
  const [hasVerificationWentCorrect,setHasVerificationWentCorrect] = useState(null);
  
  return (
    <>
    <form onSubmit={(e) => {
    register(e,email,password,confirmPassword,setHasVerificationWentCorrect);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    }} name='registration_form'>
    <label htmlFor='email'> Email </label> 
    <input id='email' name='email' onChange={(event) => setEmail(event.target.value)}/> 
    <label htmlFor='password'> Password </label>
    <input id='password' name='password' onChange={(event) => setPassword(event.target.value)}/>
    <label htmlFor='confirmPassword'> Repeat Password </label>
    <input id='confirmPassword' name='confirmPassword' onChange={(event) => setConfirmPassword(event.target.value)}/>
    <button type='submit'> Submit </button>
    </form>
    {typeof hasVerificationWentCorrect === 'boolean' && <RegisterPopup setHasVerificationWentCorrect = {setHasVerificationWentCorrect} hasVerificationWentCorrect = {hasVerificationWentCorrect}/>}
    </>
  )
}

export default Auth