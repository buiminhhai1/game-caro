import React from 'react';
import classes from './GameInfo.module.css';
import Button from '../UI/Button/Button';
const GameInfo = (props) => {
    const moves = props.history.map((step, move) => {
        const desc = move ? 'Go to move #' + move :
                            'Go to game start';
       return (
           <li key={move} value={move}>
               <Button btnType={"Primary"} btnSpec="Button_2" clicked={() => props.onClick(move)} >
                    {desc}
                </Button> 
           </li>
       );
    });

    return(
        <div className={classes.GameInfo}>
            <h2 className={classes[props.type]}>{props.status}</h2>
            <Button btnType="Green" clicked={props.restart} >Restart</Button>
            
            <div className={classes.ControlHistory}>
                
                <Button btnType="Red" disabled={props.disabledPre} clicked={props.previous}>{'<-'}</Button>
                <Button btnType="Red" disabled={props.disabledNext} clicked={props.next}>{'->'}</Button>
            </div>
            <ol>{moves}</ol>
        </div>
    );
};  

export default GameInfo;