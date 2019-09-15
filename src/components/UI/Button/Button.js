import React from 'react';
import classes from './Button.module.css';
const Button = (props) => (
    <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType], classes[props.btnSpec]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default Button;