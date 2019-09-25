import React from 'react';
import Game from './containers/Game/Game';
import classes from './App.module.css';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={classes.App}>
      <Game />
    </div>
  );
}

export default App;
