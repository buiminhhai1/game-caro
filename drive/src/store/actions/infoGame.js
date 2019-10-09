/* eslint-disable import/prefer-default-export */
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
