import React from 'react';
import './App.css';
import GridBoard from './components/GridBoard';
import NextBlock from './components/NextBlock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">DER TETRIS</h1>
      </header>
      <GridBoard />
      <NextBlock />
    </div>
  );
}

export default App;
