import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import GameInfo from '../../components/GameInfo/GameInfo';
import music from '../../assets/audio/background.mp3';
import soundClick from '../../assets/audio/toe.wav';
import musicWin from '../../assets/audio/sound-win.wav';
import classes from './Game.module.css';
import WinnerMessage from '../../components/Modal/WinnerMessage/WinnerMessage';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/Modal/Modal';

class Game extends Component {
    constructor(props){
      super(props);
      let sound = new Audio(music);
      sound.loop = true;
      sound.volume = 0.2;
      sound.autoplay = true;
      let soundTick = new Audio(soundClick);
      soundTick.volume = 0.1;
      soundTick.loop = false;
      soundTick.autoplay = false;
      let soundWin = new Audio(musicWin);
      soundWin.volume = 0.05;
      soundWin.loop = false;
      soundWin.autoplay = false;
      this.state = {
        history: [
            {
                squares: Array(400).fill(null)
            }
        ],
        undo: [],
        redo: [],
        arrayWin: [],
        stepNumber: 0,
        xIsNext: true,
        isWinner: false,
        isCanMove: true,
        backgroundMusic: sound,
        tick: soundTick,
        win: soundWin,
        closeModal: false
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = [...current.squares];
      if (squares[i] || this.state.isCanMove === false)
          return;
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.state.tick.play();
      this.setState((prevState)=> {
          let updatedHistory = prevState.history.slice(0, prevState.stepNumber + 1);
          return {
              history: updatedHistory.concat([{
                  squares: squares
              }]),
              undo: [...prevState.history],
              stepNumber: prevState.stepNumber + 1,
                xIsNext: !prevState.xIsNext
          }
      });
      
      if (this.calculateWinner(squares,i)){
          setTimeout(() => {
              this.setState({
                  isWinner: true,
              }, (result) => {
                  this.state.win.play();
                  return;
              });
          },1800);
          
      }
    }
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
  
    calculateWinner(squares, index) {
      const col = index % 20;
      const row = Math.floor(index / 20);
      const anotherTeam = squares[index] === 'X' ? 'O' : 'X';
      // case 1: thắng xxxx0
      // case a: cùng dòng
      if (col >= 4) {
        if (squares[row * 20 + (col - 1)] === squares[index]
          && squares[row * 20 + (col - 2)] === squares[index]
          && squares[row * 20 + (col - 3)] === squares[index]
          && squares[row * 20 + (col - 4)] === squares[index]) {
          if (col > 4) {
            if (squares[row * 20 + (col - 5)] === anotherTeam
              && squares[row * 20 + (col + 1)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            row * 20 + (col - 1),
            row * 20 + (col - 2),
            row * 20 + (col - 3),
            row * 20 + (col - 4),
            index,
          ];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case b: cùng cột
      if (row >= 4) {
        if (squares[(row - 1) * 20 + col] === squares[index]
        && squares[(row - 2) * 20 + col] === squares[index]
        && squares[(row - 3) * 20 + col] === squares[index]
        && squares[(row - 4) * 20 + col] === squares[index]) {
          if (row > 4) {
            if (squares[(row - 5) * 20 + col] === anotherTeam
              && squares[(row + 1) * 20 + col] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + col,
            (row - 2) * 20 + col,
            (row - 3) * 20 + col,
            (row - 4) * 20 + col,
            index,
          ];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case c: cùng chéo trái
      if (row >= 4 && col >= 4) {
        if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
        && squares[(row - 2) * 20 + (col - 2)] === squares[index]
        && squares[(row - 3) * 20 + (col - 3)] === squares[index]
        && squares[(row - 4) * 20 + (col - 4)] === squares[index]) {
          if (row > 4 && col > 4) {
            if (squares[(row - 5) * 20 + (col - 5)] === anotherTeam
            && squares[(row + 1) * 20 + (col + 1)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + (col - 1),
            (row - 2) * 20 + (col - 2),
            (row - 3) * 20 + (col - 3),
            (row - 4) * 20 + (col - 4),
            index,
          ];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case d: cùng chéo phải
      if (col >= 4) {
        if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
        && squares[(row + 2) * 20 + (col - 2)] === squares[index]
        && squares[(row + 3) * 20 + (col - 3)] === squares[index]
        && squares[(row + 4) * 20 + (col - 4)] === squares[index]) {
          if (col > 4 && row > 0) {
            if (squares[(row + 5) * 20 + (col - 5)] === anotherTeam
            && squares[(row - 1) * 20 + (col + 1)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row + 1) * 20 + (col - 1),
            (row + 2) * 20 + (col - 2),
            (row + 3) * 20 + (col - 3),
            (row + 4) * 20 + (col - 4),
            index,
          ];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case 2: thắng xxx0x
      // case a: cùng dòng
      if (col >= 3) {
        if (squares[row * 20 + (col - 1)] === squares[index]
        && squares[row * 20 + (col - 2)] === squares[index]
        && squares[row * 20 + (col - 3)] === squares[index]
        && squares[row * 20 + (col + 1)] === squares[index]) {
          if (col > 3) {
            if (squares[row * 20 + (col - 4)] === anotherTeam
            && squares[row * 20 + (col + 2)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            row * 20 + (col - 1),
            row * 20 + (col - 2),
            row * 20 + (col - 3),
            row * 20 + (col + 1),
            index,
          ];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case b: cùng cột
      if (row >= 3) {
        if (squares[(row - 1) * 20 + col] === squares[index]
        && squares[(row - 2) * 20 + col] === squares[index]
        && squares[(row - 3) * 20 + col] === squares[index]
        && squares[(row + 1) * 20 + col] === squares[index]) {
          if (row > 3) {
            if (squares[(row - 4) * 20 + col] === anotherTeam
            && squares[(row + 2) * 20 + col] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + col,
            (row - 2) * 20 + col,
            (row - 3) * 20 + col,
            (row + 1) * 20 + col,
            index,
          ];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case c: cùng chéo trái
      if (row >= 3 && col >= 3) {
        if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
          && squares[(row - 2) * 20 + (col - 2)] === squares[index]
          && squares[(row - 3) * 20 + (col - 3)] === squares[index]
          && squares[(row + 1) * 20 + (col + 1)] === squares[index]) {
          if (row > 3 && col > 3) {
            if (squares[(row - 4) * 20 + (col - 4)] === anotherTeam
            && squares[(row + 2) * 20 + (col + 2)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + (col - 1),
            (row - 2) * 20 + (col - 2),
            (row - 3) * 20 + (col - 3),
            (row + 1) * 20 + (col + 1), index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case d: cùng chéo phải
      if (col >= 3) {
        if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
        && squares[(row + 2) * 20 + (col - 2)] === squares[index]
        && squares[(row + 3) * 20 + (col - 3)] === squares[index]
        && squares[(row - 1) * 20 + (col + 1)] === squares[index]) {
          if (col > 3 && row > 1) {
            if (squares[(row + 4) * 20 + (col - 4)] === anotherTeam
            && squares[(row + 1) * 20 + (col - 1)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row + 1) * 20 + (col - 1),
            (row + 2) * 20 + (col - 2),
            (row + 3) * 20 + (col - 3),
            (row - 1) * 20 + (col + 1),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case 3: thắng xx0xx
      // case a: cùng dòng
      if (col >= 2) {
        if (squares[row * 20 + (col - 1)] === squares[index]
        && squares[row * 20 + (col - 2)] === squares[index]
        && squares[row * 20 + (col + 1)] === squares[index]
        && squares[row * 20 + (col + 2)] === squares[index]) {
          if (col > 2) {
            if (squares[row * 20 + (col - 3)] === anotherTeam
            && squares[row * 20 + (col + 3)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            row * 20 + (col - 1),
            row * 20 + (col - 2),
            row * 20 + (col + 1),
            row * 20 + (col + 2),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case b: cùng cột
      if (row >= 2) {
        if (squares[(row - 1) * 20 + col] === squares[index]
        && squares[(row - 2) * 20 + col] === squares[index]
        && squares[(row + 1) * 20 + col] === squares[index]
        && squares[(row + 2) * 20 + col] === squares[index]) {
          if (row > 2) {
            if (squares[(row - 3) * 20 + col] === anotherTeam
            && squares[(row + 3) * 20 + col] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + col,
            (row - 2) * 20 + col,
            (row + 1) * 20 + col,
            (row + 2) * 20 + col,
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case c: cùng chéo trái
      if (row >= 2 && col >= 2) {
        if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
        && squares[(row - 2) * 20 + (col - 2)] === squares[index]
        && squares[(row + 1) * 20 + (col + 1)] === squares[index]
        && squares[(row + 2) * 20 + (col + 2)] === squares[index]) {
          if (row > 2 && col > 2) {
            if (squares[(row - 3) * 20 + (col - 3)] === anotherTeam
            && squares[(row + 3) * 20 + (col + 3)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + (col - 1),
            (row - 2) * 20 + (col - 2),
            (row + 1) * 20 + (col + 1),
            (row + 2) * 20 + (col + 2),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case d: cùng chéo phải
      if (col >= 2) {
        if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
        && squares[(row + 2) * 20 + (col - 2)] === squares[index]
        && squares[(row - 1) * 20 + (col + 1)] === squares[index]
        && squares[(row - 2) * 20 + (col + 2)] === squares[index]) {
          if (col > 2 && row > 2) {
            if (squares[(row + 3) * 20 + (col - 3)] === anotherTeam
            && squares[(row - 3) * 20 + (col + 3)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row + 1) * 20 + (col - 1),
            (row + 2) * 20 + (col - 2),
            (row - 1) * 20 + (col + 1),
            (row - 2) * 20 + (col + 2),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
  
      // case 4: thắng x0xxx
      // case a: cùng dòng
      if (col >= 1) {
        if (squares[row * 20 + (col - 1)] === squares[index]
        && squares[row * 20 + (col + 1)] === squares[index]
        && squares[row * 20 + (col + 2)] === squares[index]
        && squares[row * 20 + (col + 3)] === squares[index]) {
          if (col > 1) {
            if (squares[row * 20 + (col - 2)] === anotherTeam
              && squares[row * 20 + (col + 4)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            row * 20 + (col - 1),
            row * 20 + (col + 1),
            row * 20 + (col + 2),
            row * 20 + (col + 3),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case b: cùng cột
      if (row >= 1) {
        if (squares[(row - 1) * 20 + col] === squares[index]
        && squares[(row + 1) * 20 + col] === squares[index]
        && squares[(row + 2) * 20 + col] === squares[index]
        && squares[(row + 3) * 20 + col] === squares[index]) {
          if (row > 1) {
            if (squares[(row - 2) * 20 + col] === anotherTeam
            && squares[(row + 4) * 20 + col] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + col,
            (row + 1) * 20 + col,
            (row + 2) * 20 + col,
            (row + 3) * 20 + col,
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case c: cùng chéo trái
      if (row >= 1 && col >= 1) {
        if (squares[(row - 1) * 20 + (col - 1)] === squares[index]
        && squares[(row + 1) * 20 + (col + 1)] === squares[index]
        && squares[(row + 2) * 20 + (col + 2)] === squares[index]
        && squares[(row + 3) * 20 + (col + 3)] === squares[index]) {
          if (row > 1 && col > 1) {
            if (squares[(row - 2) * 20 + (col - 2)] === anotherTeam
            && squares[(row + 4) * 20 + (col + 4)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row - 1) * 20 + (col - 1),
            (row + 1) * 20 + (col + 1),
            (row + 2) * 20 + (col + 2),
            (row + 3) * 20 + (col + 3),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case d: cùng chéo phải
      if (row >= 3) {
        if (squares[(row + 1) * 20 + (col - 1)] === squares[index]
        && squares[(row - 1) * 20 + (col + 1)] === squares[index]
        && squares[(row - 2) * 20 + (col + 2)] === squares[index]
        && squares[(row - 3) * 20 + (col + 3)] === squares[index]) {
          if (col > 1 && row > 3) {
            if (squares[(row + 2) * 20 + (col - 2)] === anotherTeam
            && squares[(row - 4) * 20 + (col + 4)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            (row + 1) * 20 + (col - 1),
            (row - 1) * 20 + (col + 1),
            (row - 2) * 20 + (col + 2),
            (row - 3) * 20 + (col + 3),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
  
      // case 5: thắng 0xxxx
      // case a: cùng dòng
      if (col >= 0) {
        if (squares[row * 20 + (col + 1)] === squares[index]
        && squares[row * 20 + (col + 2)] === squares[index]
        && squares[row * 20 + (col + 3)] === squares[index]
        && squares[row * 20 + (col + 4)] === squares[index]) {
          if (col > 0) {
            if (squares[row * 20 + (col - 1)] === anotherTeam
            && squares[row * 20 + (col + 5)] === anotherTeam) {
              return false;
            }
          }
          const temp = [
            row * 20 + (col + 1),
            row * 20 + (col + 2),
            row * 20 + (col + 3),
            row * 20 + (col + 4),
            index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case b: cùng cột
      if (row >= 0) {
        if (squares[(row + 1) * 20 + col] === squares[index]
        && squares[(row + 2) * 20 + col] === squares[index]
        && squares[(row + 3) * 20 + col] === squares[index]
        && squares[(row + 4) * 20 + col] === squares[index]) {
          if (row > 0) {
            if (squares[(row - 1) * 20 + col] === anotherTeam
            && squares[(row + 5) * 20 + col] === anotherTeam) {
              return false;
            }
          }
          const temp = [(row + 1) * 20 + col,
            (row + 2) * 20 + col, (row + 3) * 20 + col, (row + 4) * 20 + col, index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case c: cùng chéo trái
      if (row >= 0 && col >= 0) {
        if (squares[(row + 1) * 20 + (col + 1)] === squares[index]
        && squares[(row + 2) * 20 + (col + 2)] === squares[index]
        && squares[(row + 3) * 20 + (col + 3)] === squares[index]
        && squares[(row + 4) * 20 + (col + 4)] === squares[index]) {
          if (row > 0 && col > 0) {
            if (squares[(row - 1) * 20 + (col - 1)] === anotherTeam
            && squares[(row + 5) * 20 + (col + 5)] === anotherTeam) {
              return false;
            }
          }
          const temp = [(row + 1) * 20 + (col + 1),
            (row + 2) * 20 + (col + 2),
            (row + 3) * 20 + (col + 3), (row + 4) * 20 + (col + 4), index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      // case d: cùng chéo phải
      if (row >= 4) {
        if (squares[(row - 1) * 20 + (col + 1)] === squares[index]
        && squares[(row - 2) * 20 + (col + 2)] === squares[index]
        && squares[(row - 3) * 20 + (col + 3)] === squares[index]
        && squares[(row - 4) * 20 + (col + 4)] === squares[index]) {
          if (col > 0 && row > 4) {
            if (squares[(row + 1) * 20 + (col - 1)] === anotherTeam
            && squares[(row - 5) * 20 + (col + 5)] === anotherTeam) {
              return false;
            }
          }
          const temp = [(row - 1) * 20 + (col + 1),
            (row - 2) * 20 + (col + 2),
            (row - 3) * 20 + (col + 3), (row - 4) * 20 + (col + 4), index];
          this.setState({
            arrayWin: [...temp],
            isCanMove: false,
          });
          return true;
        }
      }
      return false;
    }
  
    restart() {
      this.setState({
        history: [
          {
            squares: Array(400).fill(null),
          },
        ],
        undo: [],
        redo: [],
        stepNumber: 0,
        arrayWin: [],
        xIsNext: true,
        isWinner: false,
        isCanMove: true,
      });
    }
  
    previous() {
      this.setState((prevState) => {
        if (prevState.history.length === 0) return;
        const temp = prevState.history;
        // eslint-disable-next-line consistent-return
        return {
          stepNumber: prevState.stepNumber - 1,
          xIsNext: ((prevState.stepNumber - 1) % 2) === 0,
          history: [...prevState.undo],
          undo: prevState.undo.slice(0, prevState.undo.length - 1),
          redo: prevState.redo.concat(temp.slice(temp.length - 1))
        };
      });
    }
  
    next() {
      this.setState((prevState) => ({
        undo: [...prevState.history],
        history: prevState.history.concat(prevState.redo[prevState.redo.length - 1]),
        redo: prevState.redo.slice(0, prevState.redo.length - 1),
        stepNumber: prevState.stepNumber + 1,
        xIsNext: ((prevState.stepNumber + 1) % 2) === 0,
      }));
    }
  
  
    modalHandler() {
      this.setState((prevState) => ({
        isWinner: !prevState.isWinner,
        history: [
          {
            squares: Array(400).fill(null),
          }
        ],
        undo: [],
        redo: [],
        arrayWin: [],
        stepNumber: 0,
        xIsNext: true,
        isCanMove: true
      }));
    }
  
    playMusic() {
      let audio = new Audio(music);
      audio.play();
  }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        let status = this.state.xIsNext ?"Next player: X" : "Next player: O";
        let nameWinner = !this.state.xIsNext ? 'X' : 'O'
        let typeWin = !this.state.xIsNext ? 'Red' : 'Green'
        let typeStatus = this.state.xIsNext ? "Red" : 'Green';
        

        let disabledPre = this.state.undo.length === 0 ? true : false;
        let disabledNext = this.state.redo.length === 0 ? true : false;

         return (
            <Aux>
                <Modal show={this.state.isWinner} modalClosed={() => this.modalHandler()}>
                    <WinnerMessage modalClosed={() => this.modalHandler()} 
                    type={typeWin} nameWinner={nameWinner}
                    />
                </Modal>
                <div className={classes.Game}>
                    <Board
                        arrayWin={this.state.arrayWin} 
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        current={this.state.stepNumber}
                        
                    />
                    <GameInfo status={status} type={typeStatus} 
                        current={this.state.stepNumber}
                        history={this.state.history}
                        onClick={step => this.jumpTo(step)}
                        restart={() =>this.restart()}               
                        disabledPre={disabledPre}
                        disabledNext={disabledNext}
                        previous={() => this.previous()}
                        next={() => this.next()}
                    />
                </div>
             </Aux>
            
        );
    }
}
export default Game;