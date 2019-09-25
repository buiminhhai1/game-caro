/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../UI/Backdrop/Backdrop.jsx';

const Modal = ({
  show,
  modalClosed,
  children,
}) => (
  <Aux>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
      className={classes.Modal}
    >
      {children}
    </div>
  </Aux>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

// eslint-disable-next-line eol-last
export default Modal;