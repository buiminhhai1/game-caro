import React from 'react';
import PropTypes from 'prop-types';
import classes from './Board.module.css';
import Square from '../Square/Square';

const Board = ({
  arrayWin,
  squares,
  onClick,
  current,
}) => {
  const renderSquare = (i) => {
    const teamWin = current % 2 === 0 ? 'WinX' : 'WinY';
    return arrayWin.indexOf(i) > -1 ? (
      <Square
        key={i}
        value={squares[i]}
        winner={teamWin}
        onClick={() => onClick(i)}
      />
    ) : (
      <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
    );
  };

  const board = [];
  for (let i = 0; i < 20; i += 1) {
    const row = [];
    for (let j = 0; j < 20; j += 1) {
      row.push(renderSquare(j + i * 20));
    }
    board.push(row);
  }

  const resultBoard = board.map((row, i) => (
    (
      <div
        key={`square${i}`.toString()}
        className={classes.Row}
      >
        {row}
      </div>
    )
  ));

  return <div className={classes.Board}>{resultBoard}</div>;
};

Board.propTypes = {
  arrayWin: PropTypes.arrayOf(PropTypes.number).isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
};

export default Board;
