/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = ({
  disabled,
  btnType,
  btnSpec,
  control,
  current,
  clicked,
  children,
}) => (
  <button
    type="button"
    disabled={disabled}
    className={[classes.Button, classes[btnType], classes[btnSpec], classes[control], classes[current]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
);
Button.propTypes = {
  disabled: PropTypes.bool,
  btnType: PropTypes.string.isRequired,
  btnSpec: PropTypes.string,
  control: PropTypes.string,
  current: PropTypes.string,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
