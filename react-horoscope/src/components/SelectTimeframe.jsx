import React from 'react';

export const SelectTimeframe = ({
  onTimeframeSelected,
}) => {
  return (
    <div>
      <h2>Load your horoscope for...</h2>
      <div className="grid">
        {['yesterday', 'today', 'tomorrow'].map(
          (timeframe) => (
            <button
              key={timeframe}
              className="timeframe"
              onClick={() => onTimeframeSelected(timeframe)}
            >
              {timeframe}
            </button>
          )
        )}
      </div>
    </div>
  );
};
