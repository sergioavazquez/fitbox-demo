import React from 'react';
import styles from './error.module.scss';

export const ErrorScreen = ({ error }) => {
  return (
    <div className={styles.mainError}>
      <h1>{error.code}</h1>
      <h2>{error.errorMsg}</h2>
    </div>
  )
}