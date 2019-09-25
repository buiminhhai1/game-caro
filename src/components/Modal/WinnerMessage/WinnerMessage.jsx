/* eslint-disable eol-last */
import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './WinnerMessage.module.css';
import Button from '../../UI/Button/Button';

const WinnerMessage = ({
  type,
  nameWinner,
  modalClosed,
}) => (
  <Aux>
    <h2>Congratulation!!!</h2>
    <h1 className={classes[type]}>{`Người chơi ${nameWinner} Đã chiến thắng`}</h1>
    <Button btnType="Primary" clicked={modalClosed}>Chơi ván nữa nè</Button>
  </Aux>
);

WinnerMessage.propTypes = {
  type: PropTypes.string.isRequired,
  nameWinner: PropTypes.string.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default WinnerMessage;