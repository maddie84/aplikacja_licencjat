import classNames from 'classnames'
import React from 'react'
import styles from './index.module.scss'

const RegisterPopup = ({setHasVerificationWentCorrect,hasVerificationWentCorrect}) => {
    return (
    <div className = {classNames(styles[hasVerificationWentCorrect?'popup-wrapper-correct':'popup-wrapper-failed'],styles.popup)}>RegisterPopup</div>
  )
}

export default RegisterPopup