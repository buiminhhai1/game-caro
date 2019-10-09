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

const prevStep = (state) => (
  updateObject(state, {
    undo: state.undo.slice(0, state.undo.length - 1),
    redo: state.redo.concat(state.slice(state.length - 1)),
    stepNumber: state.stepNumber - 1,
    xIsNext: ((state.stepNumber - 1) % 2) === 0,
    history: [...state.undo],
  })
);

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
    undo: action.undo,
    redo: action.redo,
    stepNumber: action.stepNumber,
    xIsNext: action.xIsNext,
    history: action.history,
  })
);

const handleClick = (state, action) => (
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
    case actionTypes.PLAY_MUSIC: return playMusic(state, action);
    case actionTypes.CALCULATE_WINNER: return calculateWinner(state, action);
    default: break;
  }
  return state;
};

export default reducer;
