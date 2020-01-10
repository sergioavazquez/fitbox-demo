import React from 'react';
import styles from './navigation.module.scss'
import { ReactComponent as Logo } from '../../static/logo.svg';

const Navigation = ({ config }) => {

  return (
    <div className={styles.nav}>
      <Logo />
      <span className={styles.title}>react-fitbox</span>
    </div>
  )
}

export default Navigation;