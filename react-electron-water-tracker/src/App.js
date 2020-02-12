import React, { useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [cups, setCups] = useState(
    new Array(8).fill(false)
  );

  const drink = cupIdx => {
    const newCups = [...cups];
    newCups[cupIdx] = true;
    setCups(newCups);
  };

  return (
    <div className="App">
      {cups.map((cup, idx) => (
        <div
          className={`cup ${cup ? 'drank' : ''}`}
          key={idx}
          onClick={() => drink(idx)}
        >
          <FontAwesomeIcon icon={faGlassWhiskey} />
        </div>
      ))}
    </div>
  );
};

export default App;
