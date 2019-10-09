import React from 'react';
import PropTypes from 'prop-types';
import classes from './GameInfo.module.css';
import Button from '../UI/Button/Button';

const GameInfo = ({
  status,
  type,
  current,
  history,
  onClick,
  restart,
  disabledPre,
  disabledNext,
  previous,
  next,
}) => {
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # + ${move}` : 'Go to game start';
    return current === move ? (
      <li key={`infomove${move}`.toString()} value={move}>
        <Button btnType="Primary" btnSpec="Button_2" current="Current" clicked={() => onClick(move)}>
          {desc}
        </Button>
      </li>
    ) : (
      <li key={`infomove${move}`.toString()} value={move}>
        <Button btnType="Primary" btnSpec="Button_2" clicked={() => onClick(move)}>
          {desc}
        </Button>
      </li>
    );
  });

  return (
    <div className={classes.GameInfo}>
      <h2 className={[classes[type], classes.DesktopOnly].join(' ')}>{status}</h2>
      <Button btnType="Green" className={classes.DesktopOnly} clicked={restart}>Restart</Button>
      <div className={[classes.ControlHistory].join(' ')}>
        <Button btnType="Red" control="Green" disabled={disabledPre} clicked={previous}>Prev</Button>
        <Button btnType="Red" control="Green" disabled={disabledNext} clicked={next}>Next</Button>
      </div>
      <ol className={[classes.DesktopOnly, classes.HistoryList].join(' ')}>{moves}</ol>
    </div>
  );
};

GameInfo.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  disabledPre: PropTypes.bool.isRequired,
  disabledNext: PropTypes.bool.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default GameInfo;
