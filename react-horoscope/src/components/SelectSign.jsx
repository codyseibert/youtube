import React, { useEffect, useState } from 'react';
import { getSigns } from '../services/api';
import { Symbol } from './Symbol';

export const SelectSign = ({ onSignSelected }) => {
  const [signs, setSigns] = useState([]);

  useEffect(() => {
    getSigns().then(setSigns);
  }, []);

  return (
    <div>
      <h2>Select your Sign</h2>
      <div className="grid">
        {signs.map((sign) => (
          <button
            key={sign}
            className="sign"
            onClick={() => onSignSelected(sign)}
          >
            <Symbol sign={sign}></Symbol>
            <br />
            {sign}
          </button>
        ))}
      </div>
    </div>
  );
};
