import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './GameInfo.module.css';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/index';
// {
//   status,
//   type,
//   current,
//   history,
//   onClick,
//   restart,
//   disabledPre,
//   disabledNext,
//   previous,
//   next,
// }
const GameInfo = (props) => {
  const moves = props.history.map((step, move) => {
    const desc = move ? `Go to move # + ${move}` : 'Go to game start';
    return props.current === move ? (
      <li key={`infomove${move}`.toString()} value={move}>
        <Button btnType="Primary" btnSpec="Button_2" current="Current" clicked={() => props.onClick(move)}>
          {desc}
        </Button>
      </li>
    ) : (
      <li key={`infomove${move}`.toString()} value={move}>
        <Button btnType="Primary" btnSpec="Button_2" clicked={() => props.onClick(move)}>
          {desc}
        </Button>
      </li>
    );
  });

  const status = props.xIsNext ? 'Lượt kế tiếp X' : 'Lượt kế tiếp O';
  console.log(props.xIsNext);
  return (
    <div className={classes.GameInfo}>
      <h2 className={[classes[props.type], classes.DesktopOnly].join(' ')}>{status}</h2>
      <Button btnType="Green" className={classes.DesktopOnly} clicked={props.restart}>Restart</Button>
      <div className={[classes.ControlHistory].join(' ')}>
        <Button btnType="Red" control="Green" disabled={props.undo.length === 0} clicked={props.previous}>Prev</Button>
        <Button btnType="Red" control="Green" disabled={props.redo.length === 0} clicked={props.next}>Next</Button>
      </div>
      <ol className={[classes.DesktopOnly, classes.HistoryList].join(' ')}>{moves}</ol>
    </div>
  );
};

GameInfo.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Array).isRequired,
  onClick: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  disabledPre: PropTypes.bool.isRequired,
  disabledNext: PropTypes.bool.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    undo: state.infoGame.undo,
    redo: state.infoGame.redo,
    stepNumber: state.infoGame.stepNumber,
    xIsNext: state.infoGame.xIsNext,
    history: state.infoGame.history,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    jumpTo: (params) => dispatch(actions.jumpTo(params)),
    restart: () => dispatch(actions.restart()),
    next: () => dispatch(actions.next()),
    previous: () => dispatch(actions.previous()),
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
