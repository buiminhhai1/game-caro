import React from 'react';
import classes from './Square.module.css';

const Square = (props) => {
    const color = props.value === 'X' ? 'Red' : 'Green';
    return (
        <button className={[classes.Square, classes[color]].join(' ')} 
        onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Square;