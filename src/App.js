import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import './App.css';
import GridBoard from './components/GridBoard';
import NextBlock from './components/NextBlock';
import ScoreBoard from './components/ScoreBoard';
import Controls from './components/Controls';
import MessagePopup from './components/MessagePopup';

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">DeR Tetris</h2>
        </header>
        <GridBoard />
        <NextBlock />
        <ScoreBoard />
        <Controls />
      </div>
    </Provider>
  );
}

export default App;
