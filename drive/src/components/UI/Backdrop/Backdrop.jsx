/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.css';

const Backdrop = ({ show, clicked }) => (
  show ? <div className={classes.Backdrop} onClick={clicked}> </div> : null
);
Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
