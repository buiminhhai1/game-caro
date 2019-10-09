/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
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
      some: '',
    };
  }

  // handleClick(i) {
  //   const {
  //     history,
  //     stepNumber,
  //     isCanMove,
  //     xIsNext,
  //     tick,
  //     win,
  //   } = this.state;
  //   const tempHistory = history.slice(0, stepNumber + 1);
  //   // const history = this.state.history.slice(0, this.state.stepNumber + 1);
  //   // const current = history[history.length - 1];
  //   const current = tempHistory[tempHistory.length - 1];
  //   const squares = [...current.squares];
  //   if (squares[i] || isCanMove === false) {
  //     return;
  //   }
  //   squares[i] = xIsNext ? 'X' : 'O';
  //   tick.play();
  //   this.setState((prevState) => {
  //     const updatedHistory = prevState.history.slice(0, prevState.stepNumber + 1);
  //     return {
  //       history: updatedHistory.concat([{
  //         // eslint-disable-next-line object-shorthand
  //         squares: squares,
  //       }]),
  //       undo: [...prevState.history],
  //       stepNumber: prevState.stepNumber + 1,
  //       xIsNext: !prevState.xIsNext,
  //     };
  //   });
  //   if (this.calculateWinner(squares, i)) {
  //     setTimeout(() => {
  //       this.setState({
  //         isWinner: true,
  //       }, () => {
  //         win.play();
  //       });
  //     }, 1800);
  //   }
  // }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0,
  //   });
  // }

  // calculateWinner(squares, index) {
  //   const col = index % 20;
  //   const row = Math.floor(index / 20);
  //   const anotherTeam = squares[index] === 'X' ? 'O' : 'X';
  //   // case 1: thắng xxxx0
  //   // case a: cùng dòng
  //   if (col >= 4) {
  //     if (squares[row * 20 + (col - 1)] === squares[index]
  //       && squares[row * 20 + (col - 2)] === squares[index]
  //       && squares[row * 20 + (col - 3)] === squares[index]
  //       && squares[row * 20 + (col - 4)] === squares[index]) {
  //       if (col > 4) {
  //         if (squares[row * 20 + (col - 5)] === anotherTeam
  //           && squares[row * 20 + (col + 1)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         row * 20 + (col - 1),
  //         row * 20 + (col - 2),
  //         row * 20 + (col - 3),
  //         row * 20 + (col - 4),
  //         index,
  //       ];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case b: cùng cột
  //   if (row >= 4) {
  //     if (squares[(row - 1) * 20 + col] === squares[index]
  //     && squares[(row - 2) * 20 + col] === squares[index]
  //     && squares[(row - 3) * 20 + col] === squares[index]
  //     && squares[(row - 4) * 20 + col] === squares[index]) {
  //       if (row > 4) {
  //         if (squares[(row - 5) * 20 + col] === anotherTeam
  //           && squares[(row + 1) * 20 + col] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + col,
  //         (row - 2) * 20 + col,
  //         (row - 3) * 20 + col,
  //         (row - 4) * 20 + col,
  //         index,
  //       ];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case c: cùng chéo trái
  //   if (row >= 4 && col >= 4) {
  //     if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row - 2) * 20 + (col - 2)] === squares[index]
  //     && squares[(row - 3) * 20 + (col - 3)] === squares[index]
  //     && squares[(row - 4) * 20 + (col - 4)] === squares[index]) {
  //       if (row > 4 && col > 4) {
  //         if (squares[(row - 5) * 20 + (col - 5)] === anotherTeam
  //         && squares[(row + 1) * 20 + (col + 1)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + (col - 1),
  //         (row - 2) * 20 + (col - 2),
  //         (row - 3) * 20 + (col - 3),
  //         (row - 4) * 20 + (col - 4),
  //         index,
  //       ];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case d: cùng chéo phải
  //   if (col >= 4) {
  //     if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row + 2) * 20 + (col - 2)] === squares[index]
  //     && squares[(row + 3) * 20 + (col - 3)] === squares[index]
  //     && squares[(row + 4) * 20 + (col - 4)] === squares[index]) {
  //       if (col > 4 && row > 0) {
  //         if (squares[(row + 5) * 20 + (col - 5)] === anotherTeam
  //         && squares[(row - 1) * 20 + (col + 1)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row + 1) * 20 + (col - 1),
  //         (row + 2) * 20 + (col - 2),
  //         (row + 3) * 20 + (col - 3),
  //         (row + 4) * 20 + (col - 4),
  //         index,
  //       ];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case 2: thắng xxx0x
  //   // case a: cùng dòng
  //   if (col >= 3) {
  //     if (squares[row * 20 + (col - 1)] === squares[index]
  //     && squares[row * 20 + (col - 2)] === squares[index]
  //     && squares[row * 20 + (col - 3)] === squares[index]
  //     && squares[row * 20 + (col + 1)] === squares[index]) {
  //       if (col > 3) {
  //         if (squares[row * 20 + (col - 4)] === anotherTeam
  //         && squares[row * 20 + (col + 2)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         row * 20 + (col - 1),
  //         row * 20 + (col - 2),
  //         row * 20 + (col - 3),
  //         row * 20 + (col + 1),
  //         index,
  //       ];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case b: cùng cột
  //   if (row >= 3) {
  //     if (squares[(row - 1) * 20 + col] === squares[index]
  //     && squares[(row - 2) * 20 + col] === squares[index]
  //     && squares[(row - 3) * 20 + col] === squares[index]
  //     && squares[(row + 1) * 20 + col] === squares[index]) {
  //       if (row > 3) {
  //         if (squares[(row - 4) * 20 + col] === anotherTeam
  //         && squares[(row + 2) * 20 + col] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + col,
  //         (row - 2) * 20 + col,
  //         (row - 3) * 20 + col,
  //         (row + 1) * 20 + col,
  //         index,
  //       ];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case c: cùng chéo trái
  //   if (row >= 3 && col >= 3) {
  //     if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
  //       && squares[(row - 2) * 20 + (col - 2)] === squares[index]
  //       && squares[(row - 3) * 20 + (col - 3)] === squares[index]
  //       && squares[(row + 1) * 20 + (col + 1)] === squares[index]) {
  //       if (row > 3 && col > 3) {
  //         if (squares[(row - 4) * 20 + (col - 4)] === anotherTeam
  //         && squares[(row + 2) * 20 + (col + 2)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + (col - 1),
  //         (row - 2) * 20 + (col - 2),
  //         (row - 3) * 20 + (col - 3),
  //         (row + 1) * 20 + (col + 1), index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case d: cùng chéo phải
  //   if (col >= 3) {
  //     if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row + 2) * 20 + (col - 2)] === squares[index]
  //     && squares[(row + 3) * 20 + (col - 3)] === squares[index]
  //     && squares[(row - 1) * 20 + (col + 1)] === squares[index]) {
  //       if (col > 3 && row > 1) {
  //         if (squares[(row + 4) * 20 + (col - 4)] === anotherTeam
  //         && squares[(row + 1) * 20 + (col - 1)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row + 1) * 20 + (col - 1),
  //         (row + 2) * 20 + (col - 2),
  //         (row + 3) * 20 + (col - 3),
  //         (row - 1) * 20 + (col + 1),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case 3: thắng xx0xx
  //   // case a: cùng dòng
  //   if (col >= 2) {
  //     if (squares[row * 20 + (col - 1)] === squares[index]
  //     && squares[row * 20 + (col - 2)] === squares[index]
  //     && squares[row * 20 + (col + 1)] === squares[index]
  //     && squares[row * 20 + (col + 2)] === squares[index]) {
  //       if (col > 2) {
  //         if (squares[row * 20 + (col - 3)] === anotherTeam
  //         && squares[row * 20 + (col + 3)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         row * 20 + (col - 1),
  //         row * 20 + (col - 2),
  //         row * 20 + (col + 1),
  //         row * 20 + (col + 2),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case b: cùng cột
  //   if (row >= 2) {
  //     if (squares[(row - 1) * 20 + col] === squares[index]
  //     && squares[(row - 2) * 20 + col] === squares[index]
  //     && squares[(row + 1) * 20 + col] === squares[index]
  //     && squares[(row + 2) * 20 + col] === squares[index]) {
  //       if (row > 2) {
  //         if (squares[(row - 3) * 20 + col] === anotherTeam
  //         && squares[(row + 3) * 20 + col] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + col,
  //         (row - 2) * 20 + col,
  //         (row + 1) * 20 + col,
  //         (row + 2) * 20 + col,
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case c: cùng chéo trái
  //   if (row >= 2 && col >= 2) {
  //     if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row - 2) * 20 + (col - 2)] === squares[index]
  //     && squares[(row + 1) * 20 + (col + 1)] === squares[index]
  //     && squares[(row + 2) * 20 + (col + 2)] === squares[index]) {
  //       if (row > 2 && col > 2) {
  //         if (squares[(row - 3) * 20 + (col - 3)] === anotherTeam
  //         && squares[(row + 3) * 20 + (col + 3)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + (col - 1),
  //         (row - 2) * 20 + (col - 2),
  //         (row + 1) * 20 + (col + 1),
  //         (row + 2) * 20 + (col + 2),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case d: cùng chéo phải
  //   if (col >= 2) {
  //     if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row + 2) * 20 + (col - 2)] === squares[index]
  //     && squares[(row - 1) * 20 + (col + 1)] === squares[index]
  //     && squares[(row - 2) * 20 + (col + 2)] === squares[index]) {
  //       if (col > 2 && row > 2) {
  //         if (squares[(row + 3) * 20 + (col - 3)] === anotherTeam
  //         && squares[(row - 3) * 20 + (col + 3)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row + 1) * 20 + (col - 1),
  //         (row + 2) * 20 + (col - 2),
  //         (row - 1) * 20 + (col + 1),
  //         (row - 2) * 20 + (col + 2),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }

  //   // case 4: thắng x0xxx
  //   // case a: cùng dòng
  //   if (col >= 1) {
  //     if (squares[row * 20 + (col - 1)] === squares[index]
  //     && squares[row * 20 + (col + 1)] === squares[index]
  //     && squares[row * 20 + (col + 2)] === squares[index]
  //     && squares[row * 20 + (col + 3)] === squares[index]) {
  //       if (col > 1) {
  //         if (squares[row * 20 + (col - 2)] === anotherTeam
  //           && squares[row * 20 + (col + 4)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         row * 20 + (col - 1),
  //         row * 20 + (col + 1),
  //         row * 20 + (col + 2),
  //         row * 20 + (col + 3),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case b: cùng cột
  //   if (row >= 1) {
  //     if (squares[(row - 1) * 20 + col] === squares[index]
  //     && squares[(row + 1) * 20 + col] === squares[index]
  //     && squares[(row + 2) * 20 + col] === squares[index]
  //     && squares[(row + 3) * 20 + col] === squares[index]) {
  //       if (row > 1) {
  //         if (squares[(row - 2) * 20 + col] === anotherTeam
  //         && squares[(row + 4) * 20 + col] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + col,
  //         (row + 1) * 20 + col,
  //         (row + 2) * 20 + col,
  //         (row + 3) * 20 + col,
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case c: cùng chéo trái
  //   if (row >= 1 && col >= 1) {
  //     if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row + 1) * 20 + (col + 1)] === squares[index]
  //     && squares[(row + 2) * 20 + (col + 2)] === squares[index]
  //     && squares[(row + 3) * 20 + (col + 3)] === squares[index]) {
  //       if (row > 1 && col > 1) {
  //         if (squares[(row - 2) * 20 + (col - 2)] === anotherTeam
  //         && squares[(row + 4) * 20 + (col + 4)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row - 1) * 20 + (col - 1),
  //         (row + 1) * 20 + (col + 1),
  //         (row + 2) * 20 + (col + 2),
  //         (row + 3) * 20 + (col + 3),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case d: cùng chéo phải
  //   if (row >= 3) {
  //     if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
  //     && squares[(row - 1) * 20 + (col + 1)] === squares[index]
  //     && squares[(row - 2) * 20 + (col + 2)] === squares[index]
  //     && squares[(row - 3) * 20 + (col + 3)] === squares[index]) {
  //       if (col > 1 && row > 3) {
  //         if (squares[(row + 2) * 20 + (col - 2)] === anotherTeam
  //         && squares[(row - 4) * 20 + (col + 4)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         (row + 1) * 20 + (col - 1),
  //         (row - 1) * 20 + (col + 1),
  //         (row - 2) * 20 + (col + 2),
  //         (row - 3) * 20 + (col + 3),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }

  //   // case 5: thắng 0xxxx
  //   // case a: cùng dòng
  //   if (col >= 0) {
  //     if (squares[row * 20 + (col + 1)] === squares[index]
  //     && squares[row * 20 + (col + 2)] === squares[index]
  //     && squares[row * 20 + (col + 3)] === squares[index]
  //     && squares[row * 20 + (col + 4)] === squares[index]) {
  //       if (col > 0) {
  //         if (squares[row * 20 + (col - 1)] === anotherTeam
  //         && squares[row * 20 + (col + 5)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [
  //         row * 20 + (col + 1),
  //         row * 20 + (col + 2),
  //         row * 20 + (col + 3),
  //         row * 20 + (col + 4),
  //         index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case b: cùng cột
  //   if (row >= 0) {
  //     if (squares[(row + 1) * 20 + col] === squares[index]
  //     && squares[(row + 2) * 20 + col] === squares[index]
  //     && squares[(row + 3) * 20 + col] === squares[index]
  //     && squares[(row + 4) * 20 + col] === squares[index]) {
  //       if (row > 0) {
  //         if (squares[(row - 1) * 20 + col] === anotherTeam
  //         && squares[(row + 5) * 20 + col] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [(row + 1) * 20 + col,
  //         (row + 2) * 20 + col, (row + 3) * 20 + col, (row + 4) * 20 + col, index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case c: cùng chéo trái
  //   if (row >= 0 && col >= 0) {
  //     if (squares[(row + 1) * 20 + (col + 1)] === squares[index]
  //     && squares[(row + 2) * 20 + (col + 2)] === squares[index]
  //     && squares[(row + 3) * 20 + (col + 3)] === squares[index]
  //     && squares[(row + 4) * 20 + (col + 4)] === squares[index]) {
  //       if (row > 0 && col > 0) {
  //         if (squares[(row - 1) * 20 + (col - 1)] === anotherTeam
  //         && squares[(row + 5) * 20 + (col + 5)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [(row + 1) * 20 + (col + 1),
  //         (row + 2) * 20 + (col + 2),
  //         (row + 3) * 20 + (col + 3), (row + 4) * 20 + (col + 4), index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   // case d: cùng chéo phải
  //   if (row >= 4) {
  //     if (squares[(row - 1) * 20 + (col + 1)] === squares[index]
  //     && squares[(row - 2) * 20 + (col + 2)] === squares[index]
  //     && squares[(row - 3) * 20 + (col + 3)] === squares[index]
  //     && squares[(row - 4) * 20 + (col + 4)] === squares[index]) {
  //       if (col > 0 && row > 4) {
  //         if (squares[(row + 1) * 20 + (col - 1)] === anotherTeam
  //         && squares[(row - 5) * 20 + (col + 5)] === anotherTeam) {
  //           return false;
  //         }
  //       }
  //       const temp = [(row - 1) * 20 + (col + 1),
  //         (row - 2) * 20 + (col + 2),
  //         (row - 3) * 20 + (col + 3), (row - 4) * 20 + (col + 4), index];
  //       this.setState({
  //         arrayWin: [...temp],
  //         isCanMove: false,
  //       });
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // restart() {
  //   this.setState({
  //     history: [
  //       {
  //         squares: Array(400).fill(null),
  //       },
  //     ],
  //     undo: [],
  //     redo: [],
  //     stepNumber: 0,
  //     arrayWin: [],
  //     xIsNext: true,
  //     isWinner: false,
  //     isCanMove: true,
  //   });
  // }

  // previous() {
  //   this.setState((prevState) => {
  //     if (prevState.history.length === 0) return;
  //     const temp = prevState.history;
  //     // eslint-disable-next-line consistent-return
  //     return {
  //       stepNumber: prevState.stepNumber - 1,
  //       xIsNext: ((prevState.stepNumber - 1) % 2) === 0,
  //       history: [...prevState.undo],
  //       undo: prevState.undo.slice(0, prevState.undo.length - 1),
  //       redo: prevState.redo.concat(temp.slice(temp.length - 1)),
  //     };
  //   });
  // }

  // next() {
  //   this.setState((prevState) => ({
  //     undo: [...prevState.history],
  //     history: prevState.history.concat(prevState.redo[prevState.redo.length - 1]),
  //     redo: prevState.redo.slice(0, prevState.redo.length - 1),
  //     stepNumber: prevState.stepNumber + 1,
  //     xIsNext: ((prevState.stepNumber + 1) % 2) === 0,
  //   }));
  // }

  // modalHandler() {
  //   this.setState((prevState) => ({
  //     isWinner: !prevState.isWinner,
  //     history: [
  //       {
  //         squares: Array(400).fill(null),
  //       },
  //     ],
  //     undo: [],
  //     redo: [],
  //     arrayWin: [],
  //     stepNumber: 0,
  //     xIsNext: true,
  //     isCanMove: true,
  //   }));
  // }

  // playMusic() {
  //   const audio = new Audio(music);
  //   audio.play();
  // }

  render() {
    // const {
    //   history,
    //   stepNumber,
    //   xIsNext,
    //   undo,
    //   redo,
    //   isWinner,
    //   arrayWin,
    // } = this.props;
    const current = this.props.history[this.props.stepNumber];
    const nameWinner = !this.props.xIsNext ? 'X' : 'O';
    const typeWin = !this.props.xIsNext ? 'Red' : 'Green';
    const typeStatus = this.props.xIsNext ? 'Red' : 'Green';
    const status = this.props.xIsNext ? 'Lượt kế tiếp X' : 'Lượt kế tiếp O';
    return (
      <Aux>
        <Modal show={this.props.isWinner} modalClosed={() => this.modalHandler()}>
          <WinnerMessage
            modalClosed={() => this.modalHandler()}
            type={typeWin}
            nameWinner={nameWinner}
          />
        </Modal>
        <div
          className={classes.Game}
        >
          <Board
            arrayWin={this.props.arrayWin}
            squares={current.squares}
            onClick={(index) => this.props.handleClick(index)}
            current={this.props.stepNumber}
          />
          <GameInfo
            status={status}
            type={typeStatus.toString()}
            current={this.props.stepNumber}
            history={this.props.history}
            onClick={(step) => this.props.jumpTo(step)}
            restart={() => this.props.restart()}
            disabledPre={this.props.undo.length === 0}
            disabledNext={this.props.redo.length === 0}
            previous={() => this.props.previous()}
            next={() => this.props.next()}
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
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (index) => dispatch(actions.handleClick(index)),
  jumpTo: (step) => dispatch(actions.jumpTo(step)),
  calculateWinner: (squares, index) => dispatch(actions.calculateWinner(squares, index)),
  restart: () => dispatch(actions.restart()),
  previous: () => dispatch(actions.previous()),
  next: () => dispatch(actions.next()),
  playMusic: () => dispatch(actions.playMusic()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
