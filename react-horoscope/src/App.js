import React, { useState } from 'react';
import './App.css';
import { Symbol } from './components/Symbol';
import { SelectSign } from './components/SelectSign';
import { SelectTimeframe } from './components/SelectTimeframe';
import { Horoscope } from './components/Horoscope';

function App() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [
    selectedTimeframe,
    setSelectedTimeframe,
  ] = useState(null);

  const restart = () => {
    setSelectedTimeframe(null);
    setSelectedSign(null);
  };

  return (
    <div className="App">
      <h1>The Horoscope App</h1>

      {!selectedSign && (
        <SelectSign onSignSelected={setSelectedSign} />
      )}
      {selectedSign && !selectedTimeframe && (
        <div>
          <Symbol sign={selectedSign}></Symbol>
          <h2>{selectedSign}</h2>
          <SelectTimeframe
            onTimeframeSelected={setSelectedTimeframe}
          />
        </div>
      )}
      {selectedSign && selectedTimeframe && (
        <>
          <Horoscope
            timeframe={selectedTimeframe}
            sign={selectedSign}
          />
          <button onClick={restart}>Restart</button>
        </>
      )}
    </div>
  );
}

export default App;
