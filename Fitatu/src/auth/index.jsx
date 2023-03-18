import React from 'react'
// kod, który piszę jest semantyczny co oznacza, że jest przyjazny osobom niepełnosprawnym, które wykorzystują narzędzia
//potrzebne do odczytu ekranu, z którymi nasz kod jest kompatybilny 
const Auth = () => {
  return (
    <form><label htmlFor='email'> Email </label> 
    <input id='email' name='email'/> 
    <label htmlFor='password'> Password </label>
    <input id='password' name='password'/>
    <label htmlFor='repeatPassword'> Repeat Password </label>
    <input id='repeatPassword' name='repeatPassword'/>
    <button> Submit </button>
    </form>
  )
}

export default Auth