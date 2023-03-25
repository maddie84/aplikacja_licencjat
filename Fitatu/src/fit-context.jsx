import React, { createContext, useState } from 'react';
export const Context = createContext({
    userUID: "",
    setUserUID: () => {}
});

const FitContext = ({children}) => {
    const [userUID, setUserUID] = useState("");
    return (
        <Context.Provider value={{userUID, setUserUID}}>{children}</Context.Provider>
  )
}

export default FitContext