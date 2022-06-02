import { useState } from 'react';
import './App.css';

function App() {
  const [initialAmount, setInitialAmount] = useState(324);
  const [initialDate, setInitialDate] = useState(
    new Date().toISOString().slice(0, -1)
  );

  const getValueByHours = (hoursPassed = 0) => {
    return initialAmount * 0.5 ** (hoursPassed / 5);
  };

  const addHoursToInitialDate = (hoursPassed = 0) => {
    const initialDateAsDate = new Date(initialDate);
    initialDateAsDate.setHours(
      initialDateAsDate.getHours() + hoursPassed
    );
    return initialDateAsDate;
  };

  const formatDatetimeToEasternTimezoneString = (
    datetime: Date
  ) => {
    const getMMDDYYYY = `${
      datetime.getMonth() + 1
    }/${datetime.getDate()}/${datetime.getFullYear()}`;

    return (
      getMMDDYYYY +
      ' ' +
      datetime.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Caffeine Half Life Tracker</h1>
        </div>
      </div>
      <div className="row mb-4 mt-2">
        <div className="col">
          <label className="form-label">
            Initial Amount
          </label>
          <input
            type="number"
            value={initialAmount}
            className="form-control"
            onChange={(e) =>
              setInitialAmount(parseInt(e.target.value))
            }
          />
        </div>

        <div className="col">
          <label className="form-label">Initial Date</label>
          <input
            type="datetime-local"
            value={initialDate}
            className="form-control"
            onChange={(e) => {
              setInitialDate(e.target.value);
            }}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Hours Pasted</th>
            <th>Date Time</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {new Array(24)
            .fill('')
            .map((val, hoursPassed) => (
              <tr>
                <td>{hoursPassed}</td>
                <td>
                  {formatDatetimeToEasternTimezoneString(
                    addHoursToInitialDate(hoursPassed)
                  )}
                </td>
                <td>{getValueByHours(hoursPassed)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
