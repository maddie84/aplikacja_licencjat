import React, { useState } from 'react'
import Form from './form';
import styles from "./index.module.scss";

const WelcomeForm = () => {
    const [welcomeStep, setWelcomeStep] = useState(0);
    return (
        <div className={styles["welcome-form"]}> 
            {
                !welcomeStep?
            <p>Hello</p>:
            <Form/>
            }   
            <button onClick={() => setWelcomeStep(step => step + 1)}>Next step</button>
        </div>
    )
}


export default WelcomeForm