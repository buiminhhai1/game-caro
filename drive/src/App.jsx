import React from 'react';
import { connect } from 'react-redux';
import Game from './containers/Game/Game';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Game />
    </div>
  );
}

export default connect()(App);
