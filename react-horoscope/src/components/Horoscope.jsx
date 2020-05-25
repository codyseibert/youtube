import React, { useState, useEffect } from 'react';
import { getHoroscope } from '../services/api';

export const Horoscope = ({ timeframe, sign }) => {
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    getHoroscope(sign, timeframe).then((horoscope) => {
      setHoroscope(horoscope);
    });
  }, [sign, timeframe]);

  return (
    <div>
      <h3>
        {timeframe}, your {sign} horoscope is...
      </h3>
      <p>{horoscope}</p>
    </div>
  );
};
