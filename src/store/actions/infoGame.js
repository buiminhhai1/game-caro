import * as actionTypes from './actionTypes';

export const next = () => (
  {
    type: actionTypes.NEXT_STEP,
  }
);

export const previous = () => (
  {
    type: actionTypes.PREVIOUS_STEP,
  }
);

export const restart = () => (
  {
    type: actionTypes.RESTART,
  }
);

export const jumpTo = (stepNumber) => (
  {
    type: actionTypes.JUMP_TO,
    stepNumber,
  }
);

export const calculateWinner = () => (
  {
    type: actionTypes.CALCULATE_WINNER,
  }
);

export const playMusic = () => (
  {
    type: actionTypes.PLAY_MUSIC,
  }
);

export const handleClick = (index) => (
  {
    type: actionTypes.HANDLE_CLICK,
    index,
  }
);

export const modalHandler = () => (
  {
    type: actionTypes.MODAL_HANDLER,
  }
);
