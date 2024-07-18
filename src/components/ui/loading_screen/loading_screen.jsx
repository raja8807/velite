import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from './loading_screen.module.scss'

const LoadingScreen = (noBg) => {
  return (
    <div className={`${styles.LoadingScreen} ${noBg ? styles.noBg : ''}`}>
      <Spinner/>
    </div>
  )
}

export default LoadingScreen
