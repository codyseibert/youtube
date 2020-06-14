import React, { useState } from 'react';
import './App.css';
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
    setSelectedSign(null);
    setSelectedTimeframe(null);
  };

  return (
    <div className="App">
      <h1>The Horoscope App</h1>
      {!selectedSign && (
        <SelectSign onSignSelected={setSelectedSign} />
      )}
      {selectedSign && !selectedTimeframe && (
        <SelectTimeframe
          onTimeframeSelected={setSelectedTimeframe}
        />
      )}
      {selectedSign && selectedTimeframe && (
        <Horoscope
          sign={selectedSign}
          timeframe={selectedTimeframe}
        />
      )}
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default App;
