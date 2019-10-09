import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import soundClick from '../../assets/audio/toe.wav';
import musicWin from '../../assets/audio/sound-win.wav';
import music from '../../assets/audio/background.mp3';

const sound = new Audio(music);
sound.loop = true;
sound.volume = 0.2;
sound.autoplay = true;
const soundTick = new Audio(soundClick);
soundTick.volume = 0.1;
soundTick.loop = false;
soundTick.autoplay = false;
const soundWin = new Audio(musicWin);
soundWin.volume = 0.05;
soundWin.loop = false;
soundWin.autoplay = false;

const initialState = {
  history: [
    {
      squares: Array(400).fill(null),
    },
  ],
  undo: [],
  redo: [],
  arrayWin: [],
  stepNumber: 0,
  xIsNext: true,
  isWinner: false,
  isCanMove: true,
  closeModal: false,
  backgroundMusic: sound,
  tick: soundTick,
  win: soundWin,
};

const nextStep = (state) => (
  updateObject(state, {
    undo: [...state.history],
    history: state.history.concat(state.redo[state.redo.length - 1]),
    redo: state.redo.slice(0, state.redo.length - 1),
    stepNumber: state.stepNumber + 1,
    xIsNext: ((state.stepNumber + 1) % 2) === 0,
  })
);

const prevStep = (state) => {
  if (state.history.length === 0) return;
  // eslint-disable-next-line consistent-return
  return updateObject(state, {
    stepNumber: state.stepNumber - 1,
    xIsNext: (state.stepNumber - 1) % 2 === 0,
    history: [...state.undo],
    undo: state.undo.slice(0, state.undo.length - 1),
    redo: state.redo.concat(state.history.slice(state.history.length - 1)),
  });
  // this.setState((prevState) => {
  //   const temp = prevState.history;
  //   // eslint-disable-next-line consistent-return
  //   return {
  //     stepNumber: prevState.stepNumber - 1,
  //     xIsNext: ((prevState.stepNumber - 1) % 2) === 0,
  //     history: [...prevState.undo],
  //     undo: prevState.undo.slice(0, prevState.undo.length - 1),
  //     redo: prevState.redo.concat(temp.slice(temp.length - 1)),
  //   };
  // });
};

const restart = (state) => (
  updateObject(state, {
    undo: [],
    redo: [],
    stepNumber: 0,
    xIsNext: true,
    history: [
      {
        squares: Array(400).fill(null),
      },
    ],
  })
);

const jumpTo = (state, action) => (
  updateObject(state, {
    stepNumber: action.stepNumber,
    xIsNext: (action.xIsNext % 2) === 0,
  })
);

const calculateWinner = (state, index) => {
  const col = index % 20;
  const row = Math.floor(index / 20);
  const anotherTeam = state.squares[index] === 'X' ? 'O' : 'X';
  // case 1: thắng xxxx0
  // case a: cùng dòng
  if (col >= 4) {
    if (state.squares[row * 20 + (col - 1)] === state.squares[index]
      && state.squares[row * 20 + (col - 2)] === state.squares[index]
      && state.squares[row * 20 + (col - 3)] === state.squares[index]
      && state.squares[row * 20 + (col - 4)] === state.squares[index]) {
      if (col > 4) {
        if (state.squares[row * 20 + (col - 5)] === anotherTeam
          && state.squares[row * 20 + (col + 1)] === anotherTeam) {
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
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case b: cùng cột
  if (row >= 4) {
    if (state.squares[(row - 1) * 20 + col] === state.squares[index]
    && state.squares[(row - 2) * 20 + col] === state.squares[index]
    && state.squares[(row - 3) * 20 + col] === state.squares[index]
    && state.squares[(row - 4) * 20 + col] === state.squares[index]) {
      if (row > 4) {
        if (state.squares[(row - 5) * 20 + col] === anotherTeam
          && state.squares[(row + 1) * 20 + col] === anotherTeam) {
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
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case c: cùng chéo trái
  if (row >= 4 && col >= 4) {
    if (state.squares[(row - 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row - 2) * 20 + (col - 2)] === state.squares[index]
    && state.squares[(row - 3) * 20 + (col - 3)] === state.squares[index]
    && state.squares[(row - 4) * 20 + (col - 4)] === state.squares[index]) {
      if (row > 4 && col > 4) {
        if (state.squares[(row - 5) * 20 + (col - 5)] === anotherTeam
        && state.squares[(row + 1) * 20 + (col + 1)] === anotherTeam) {
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
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case d: cùng chéo phải
  if (col >= 4) {
    if (state.squares[(row + 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row + 2) * 20 + (col - 2)] === state.squares[index]
    && state.squares[(row + 3) * 20 + (col - 3)] === state.squares[index]
    && state.squares[(row + 4) * 20 + (col - 4)] === state.squares[index]) {
      if (col > 4 && row > 0) {
        if (state.squares[(row + 5) * 20 + (col - 5)] === anotherTeam
        && state.squares[(row - 1) * 20 + (col + 1)] === anotherTeam) {
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
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case 2: thắng xxx0x
  // case a: cùng dòng
  if (col >= 3) {
    if (state.squares[row * 20 + (col - 1)] === state.squares[index]
    && state.squares[row * 20 + (col - 2)] === state.squares[index]
    && state.squares[row * 20 + (col - 3)] === state.squares[index]
    && state.squares[row * 20 + (col + 1)] === state.squares[index]) {
      if (col > 3) {
        if (state.squares[row * 20 + (col - 4)] === anotherTeam
        && state.squares[row * 20 + (col + 2)] === anotherTeam) {
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
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case b: cùng cột
  if (row >= 3) {
    if (state.squares[(row - 1) * 20 + col] === state.squares[index]
    && state.squares[(row - 2) * 20 + col] === state.squares[index]
    && state.squares[(row - 3) * 20 + col] === state.squares[index]
    && state.squares[(row + 1) * 20 + col] === state.squares[index]) {
      if (row > 3) {
        if (state.squares[(row - 4) * 20 + col] === anotherTeam
        && state.squares[(row + 2) * 20 + col] === anotherTeam) {
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
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case c: cùng chéo trái
  if (row >= 3 && col >= 3) {
    if (state.squares[(row - 1) * 20 + (col - 1)] === state.squares[index]
      && state.squares[(row - 2) * 20 + (col - 2)] === state.squares[index]
      && state.squares[(row - 3) * 20 + (col - 3)] === state.squares[index]
      && state.squares[(row + 1) * 20 + (col + 1)] === state.squares[index]) {
      if (row > 3 && col > 3) {
        if (state.squares[(row - 4) * 20 + (col - 4)] === anotherTeam
        && state.squares[(row + 2) * 20 + (col + 2)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row - 1) * 20 + (col - 1),
        (row - 2) * 20 + (col - 2),
        (row - 3) * 20 + (col - 3),
        (row + 1) * 20 + (col + 1), index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case d: cùng chéo phải
  if (col >= 3) {
    if (state.squares[(row + 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row + 2) * 20 + (col - 2)] === state.squares[index]
    && state.squares[(row + 3) * 20 + (col - 3)] === state.squares[index]
    && state.squares[(row - 1) * 20 + (col + 1)] === state.squares[index]) {
      if (col > 3 && row > 1) {
        if (state.squares[(row + 4) * 20 + (col - 4)] === anotherTeam
        && state.squares[(row + 1) * 20 + (col - 1)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row + 1) * 20 + (col - 1),
        (row + 2) * 20 + (col - 2),
        (row + 3) * 20 + (col - 3),
        (row - 1) * 20 + (col + 1),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case 3: thắng xx0xx
  // case a: cùng dòng
  if (col >= 2) {
    if (state.squares[row * 20 + (col - 1)] === state.squares[index]
    && state.squares[row * 20 + (col - 2)] === state.squares[index]
    && state.squares[row * 20 + (col + 1)] === state.squares[index]
    && state.squares[row * 20 + (col + 2)] === state.squares[index]) {
      if (col > 2) {
        if (state.squares[row * 20 + (col - 3)] === anotherTeam
        && state.squares[row * 20 + (col + 3)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        row * 20 + (col - 1),
        row * 20 + (col - 2),
        row * 20 + (col + 1),
        row * 20 + (col + 2),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case b: cùng cột
  if (row >= 2) {
    if (state.squares[(row - 1) * 20 + col] === state.squares[index]
    && state.squares[(row - 2) * 20 + col] === state.squares[index]
    && state.squares[(row + 1) * 20 + col] === state.squares[index]
    && state.squares[(row + 2) * 20 + col] === state.squares[index]) {
      if (row > 2) {
        if (state.squares[(row - 3) * 20 + col] === anotherTeam
        && state.squares[(row + 3) * 20 + col] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row - 1) * 20 + col,
        (row - 2) * 20 + col,
        (row + 1) * 20 + col,
        (row + 2) * 20 + col,
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case c: cùng chéo trái
  if (row >= 2 && col >= 2) {
    if (state.squares[(row - 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row - 2) * 20 + (col - 2)] === state.squares[index]
    && state.squares[(row + 1) * 20 + (col + 1)] === state.squares[index]
    && state.squares[(row + 2) * 20 + (col + 2)] === state.squares[index]) {
      if (row > 2 && col > 2) {
        if (state.squares[(row - 3) * 20 + (col - 3)] === anotherTeam
        && state.squares[(row + 3) * 20 + (col + 3)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row - 1) * 20 + (col - 1),
        (row - 2) * 20 + (col - 2),
        (row + 1) * 20 + (col + 1),
        (row + 2) * 20 + (col + 2),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case d: cùng chéo phải
  if (col >= 2) {
    if (state.squares[(row + 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row + 2) * 20 + (col - 2)] === state.squares[index]
    && state.squares[(row - 1) * 20 + (col + 1)] === state.squares[index]
    && state.squares[(row - 2) * 20 + (col + 2)] === state.squares[index]) {
      if (col > 2 && row > 2) {
        if (state.squares[(row + 3) * 20 + (col - 3)] === anotherTeam
        && state.squares[(row - 3) * 20 + (col + 3)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row + 1) * 20 + (col - 1),
        (row + 2) * 20 + (col - 2),
        (row - 1) * 20 + (col + 1),
        (row - 2) * 20 + (col + 2),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }

  // case 4: thắng x0xxx
  // case a: cùng dòng
  if (col >= 1) {
    if (state.squares[row * 20 + (col - 1)] === state.squares[index]
    && state.squares[row * 20 + (col + 1)] === state.squares[index]
    && state.squares[row * 20 + (col + 2)] === state.squares[index]
    && state.squares[row * 20 + (col + 3)] === state.squares[index]) {
      if (col > 1) {
        if (state.squares[row * 20 + (col - 2)] === anotherTeam
          && state.squares[row * 20 + (col + 4)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        row * 20 + (col - 1),
        row * 20 + (col + 1),
        row * 20 + (col + 2),
        row * 20 + (col + 3),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case b: cùng cột
  if (row >= 1) {
    if (state.squares[(row - 1) * 20 + col] === state.squares[index]
    && state.squares[(row + 1) * 20 + col] === state.squares[index]
    && state.squares[(row + 2) * 20 + col] === state.squares[index]
    && state.squares[(row + 3) * 20 + col] === state.squares[index]) {
      if (row > 1) {
        if (state.squares[(row - 2) * 20 + col] === anotherTeam
        && state.squares[(row + 4) * 20 + col] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row - 1) * 20 + col,
        (row + 1) * 20 + col,
        (row + 2) * 20 + col,
        (row + 3) * 20 + col,
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case c: cùng chéo trái
  if (row >= 1 && col >= 1) {
    if (state.squares[(row - 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row + 1) * 20 + (col + 1)] === state.squares[index]
    && state.squares[(row + 2) * 20 + (col + 2)] === state.squares[index]
    && state.squares[(row + 3) * 20 + (col + 3)] === state.squares[index]) {
      if (row > 1 && col > 1) {
        if (state.squares[(row - 2) * 20 + (col - 2)] === anotherTeam
        && state.squares[(row + 4) * 20 + (col + 4)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row - 1) * 20 + (col - 1),
        (row + 1) * 20 + (col + 1),
        (row + 2) * 20 + (col + 2),
        (row + 3) * 20 + (col + 3),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case d: cùng chéo phải
  if (row >= 3) {
    if (state.squares[(row + 1) * 20 + (col - 1)] === state.squares[index]
    && state.squares[(row - 1) * 20 + (col + 1)] === state.squares[index]
    && state.squares[(row - 2) * 20 + (col + 2)] === state.squares[index]
    && state.squares[(row - 3) * 20 + (col + 3)] === state.squares[index]) {
      if (col > 1 && row > 3) {
        if (state.squares[(row + 2) * 20 + (col - 2)] === anotherTeam
        && state.squares[(row - 4) * 20 + (col + 4)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        (row + 1) * 20 + (col - 1),
        (row - 1) * 20 + (col + 1),
        (row - 2) * 20 + (col + 2),
        (row - 3) * 20 + (col + 3),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }

  // case 5: thắng 0xxxx
  // case a: cùng dòng
  if (col >= 0) {
    if (state.squares[row * 20 + (col + 1)] === state.squares[index]
    && state.squares[row * 20 + (col + 2)] === state.squares[index]
    && state.squares[row * 20 + (col + 3)] === state.squares[index]
    && state.squares[row * 20 + (col + 4)] === state.squares[index]) {
      if (col > 0) {
        if (state.squares[row * 20 + (col - 1)] === anotherTeam
        && state.squares[row * 20 + (col + 5)] === anotherTeam) {
          return false;
        }
      }
      const temp = [
        row * 20 + (col + 1),
        row * 20 + (col + 2),
        row * 20 + (col + 3),
        row * 20 + (col + 4),
        index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case b: cùng cột
  if (row >= 0) {
    if (state.squares[(row + 1) * 20 + col] === state.squares[index]
    && state.squares[(row + 2) * 20 + col] === state.squares[index]
    && state.squares[(row + 3) * 20 + col] === state.squares[index]
    && state.squares[(row + 4) * 20 + col] === state.squares[index]) {
      if (row > 0) {
        if (state.squares[(row - 1) * 20 + col] === anotherTeam
        && state.squares[(row + 5) * 20 + col] === anotherTeam) {
          return false;
        }
      }
      const temp = [(row + 1) * 20 + col,
        (row + 2) * 20 + col, (row + 3) * 20 + col, (row + 4) * 20 + col, index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case c: cùng chéo trái
  if (row >= 0 && col >= 0) {
    if (state.squares[(row + 1) * 20 + (col + 1)] === state.squares[index]
    && state.squares[(row + 2) * 20 + (col + 2)] === state.squares[index]
    && state.squares[(row + 3) * 20 + (col + 3)] === state.squares[index]
    && state.squares[(row + 4) * 20 + (col + 4)] === state.squares[index]) {
      if (row > 0 && col > 0) {
        if (state.squares[(row - 1) * 20 + (col - 1)] === anotherTeam
        && state.squares[(row + 5) * 20 + (col + 5)] === anotherTeam) {
          return false;
        }
      }
      const temp = [(row + 1) * 20 + (col + 1),
        (row + 2) * 20 + (col + 2),
        (row + 3) * 20 + (col + 3), (row + 4) * 20 + (col + 4), index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  // case d: cùng chéo phải
  if (row >= 4) {
    if (state.squares[(row - 1) * 20 + (col + 1)] === state.squares[index]
    && state.squares[(row - 2) * 20 + (col + 2)] === state.squares[index]
    && state.squares[(row - 3) * 20 + (col + 3)] === state.squares[index]
    && state.squares[(row - 4) * 20 + (col + 4)] === state.squares[index]) {
      if (col > 0 && row > 4) {
        if (state.squares[(row + 1) * 20 + (col - 1)] === anotherTeam
        && state.squares[(row - 5) * 20 + (col + 5)] === anotherTeam) {
          return false;
        }
      }
      const temp = [(row - 1) * 20 + (col + 1),
        (row - 2) * 20 + (col + 2),
        (row - 3) * 20 + (col + 3), (row - 4) * 20 + (col + 4), index];
      updateObject(state, {
        arrayWin: [...temp],
        isCanMove: false,
      });
      return true;
    }
  }
  return false;
};

const handleClick = (state, action) => {
  const tempHistory = state.history.slice(0, state.stepNumber + 1);
  // console.log('temp history');
  // console.log(tempHistory);
  const current = tempHistory[tempHistory.length - 1];
  // console.log('current');
  // console.log(current);
  const updatedSquares = [...current.squares];
  // console.log('update squares');
  // console.log(updatedSquares);
  if (updatedSquares[action.index] || state.isCanMove === false) {
    return;
  }
  updatedSquares[action.index] = state.xIsNext ? 'X' : 'O';
  // console.log(updatedSquares[1]);
  // console.log(updatedSquares[2]);
  state.tick.play();
  const updatedHistory = state.history.slice(0, state.stepNumber + 1);
  // eslint-disable-next-line consistent-return
  const result = updateObject(state, {
    history: updatedHistory.concat([{
      squares: updatedSquares,
    }]),
    undo: [...state.history],
    stepNumber: state.stepNumber + 1,
    xIsNext: !state.xIsNext,
  });
  calculateWinner(result, action.index);
  // eslint-disable-next-line consistent-return
  return result;
};

const audio = new Audio(music);
const playMusic = () => (
  audio.play()
);

const modalHandler = (state) => (
  updateObject(state, {

  })
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEXT_STEP: return nextStep(state, action);
    case actionTypes.PREVIOUS_STEP: return prevStep(state, action);
    case actionTypes.RESTART: return restart(state, action);
    case actionTypes.JUMP_TO: return jumpTo(state, action);
    case actionTypes.HANDLE_CLICK: return handleClick(state, action);
    case actionTypes.PLAY_MUSIC: return playMusic();
    case actionTypes.MODAL_HANDLER: return modalHandler(state, action);
    // case actionTypes.CALCULATE_WINNER: return calculateWinner(state, action);
    default: break;
  }

  return state;
};

export default reducer;
