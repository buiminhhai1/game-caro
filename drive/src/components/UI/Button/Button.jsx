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
  disabled: PropTypes.bool.isRequired,
  btnType: PropTypes.string.isRequired,
  btnSpec: PropTypes.string.isRequired,
  control: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
