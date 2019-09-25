import React from 'react';
import PropTypes from 'prop-types';
import classes from './Square.module.css';

const Square = ({ value, winner, onClick }) => {
  const color = value === 'X' ? 'Red' : 'Green';
  return (
    <button
      type="button"
      className={[classes.Square, classes[color], classes[winner]].join(' ')}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Square;
