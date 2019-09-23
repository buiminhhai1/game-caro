import React from 'react';
import classes from './Board.module.css';
import Square from '../Square/Square';

const Board = (props) => {
    console.log("arraywin");
    console.log(props.arrayWin);

    const renderSquare = (i) => {
        const teamWin = props.current % 2 === 0 ? "WinX" : "WinY";
        
        return props.arrayWin.indexOf(i) > -1 
        ? (
            <Square key={i}
            value={props.squares[i]}
            winner={teamWin}
            onClick={() => props.onClick(i)} />
        ) : (
            <Square key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                />
        );        
    }
    
    let board = [];
    for(let i = 0 ; i < 20; i++){
        let row= []
        for(let j = 0; j < 20; j++){
            row.push(renderSquare(j+ i*20));
        }
        board.push(row);
    }

    let resultBoard = board.map((row, i) => {
        return (<div key={i} className={classes.Row}>{row}</div>);
    });
        
    return (
        <div className={classes.Board}>
            {resultBoard}
        </div>
    );

}

export default Board;

