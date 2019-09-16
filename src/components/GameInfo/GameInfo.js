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
            
            <h2 className={[classes[props.type], classes.DesktopOnly].join(' ')}>{props.status}</h2>
            <Button btnType="Green" className={classes.DesktopOnly} clicked={props.restart} >Restart</Button>
            
            <div className={[classes.ControlHistory].join(' ')}>
                
                <Button btnType="Red" control="Green" disabled={props.disabledPre} clicked={props.previous}>{'Prev'}</Button>
                <div>  </div>
                <Button btnType="Red" control="Green" disabled={props.disabledNext} clicked={props.next}>{'Next'}</Button>
            </div>
            <ol className={[classes.DesktopOnly, classes.HistoryList].join(' ')}>{moves}</ol>
        </div>
    );
};  

export default GameInfo;