/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/Images/logo.png';

const Logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;
