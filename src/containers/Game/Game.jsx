/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../../components/Board/Board';
import GameInfo from '../../components/GameInfo/GameInfo';
// import music from '../../assets/audio/background.mp3';
// import soundClick from '../../assets/audio/toe.wav';
// import musicWin from '../../assets/audio/sound-win.wav';
import classes from './Game.module.css';
import WinnerMessage from '../../components/Modal/WinnerMessage/WinnerMessage';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/Modal/Modal';
import * as actions from '../../store/actions/index';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      history,
      stepNumber,
      xIsNext,
      undo,
      redo,
      isWinner,
      arrayWin,
      modalHandler,
      handleClick,
      restart,
      next,
      previous,
      jumpTo,
    } = this.props;
    const current = history[stepNumber];
    const nameWinner = !xIsNext ? 'X' : 'O';
    const typeWin = !xIsNext ? 'Red' : 'Green';
    const typeStatus = xIsNext ? 'Red' : 'Green';
    const status = xIsNext ? 'Lượt kế tiếp X' : 'Lượt kế tiếp O';
    return (
      <Aux>
        <Modal
          show={isWinner}
          modalClosed={() => modalHandler()}
        >
          <WinnerMessage
            modalClosed={() => modalHandler()}
            type={typeWin}
            nameWinner={nameWinner}
          />
        </Modal>
        <div
          className={classes.Game}
        >
          <Board
            arrayWin={arrayWin}
            squares={current.squares}
            onClick={(index) => handleClick(index)}
            current={stepNumber}
          />
          <GameInfo
            status={status}
            type={typeStatus.toString()}
            current={stepNumber}
            history={history}
            onClick={(step) => jumpTo(step)}
            restart={() => restart()}
            disabledPre={undo.length === 0}
            disabledNext={redo.length === 0}
            previous={() => previous()}
            next={() => next()}
          />
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => ({
  history: state.infoGame.history,
  undo: state.infoGame.undo,
  redo: state.infoGame.redo,
  arrayWin: state.infoGame.arrayWin,
  stepNumber: state.infoGame.stepNumber,
  isWinner: state.infoGame.isWinner,
  isCanMove: state.infoGame.isCanMove,
  backgroundMusic: state.infoGame.backgroundMusic,
  tick: state.infoGame.tick,
  win: state.infoGame.win,
  xIsNext: state.infoGame.xIsNext,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (index) => dispatch(actions.handleClick(index)),
  jumpTo: (step) => dispatch(actions.jumpTo(step)),
  calculateWinner: (squares, index) => dispatch(actions.calculateWinner(squares, index)),
  restart: () => dispatch(actions.restart()),
  previous: () => dispatch(actions.previous()),
  next: () => dispatch(actions.next()),
  playMusic: () => dispatch(actions.playMusic()),
  modalHandler: () => dispatch(actions.modalHandler()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
