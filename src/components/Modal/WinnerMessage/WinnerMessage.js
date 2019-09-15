import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './WinnerMessage.module.css';
import Button from '../../UI/Button/Button';
const WinnerMessage = (props) => {
    
    return (<Aux> 
        <h2>Congratulation!!!</h2>
        <h1 className={classes[props.type]}>Người chơi {props.nameWinner} Đã chiến thắng</h1>
        <Button btnType="Primary" clicked={props.modalClosed}>Chơi ván nữa nè</Button>
    </Aux>);
};

export default WinnerMessage;