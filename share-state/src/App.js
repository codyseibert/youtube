import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Buy } from './pages/Buy';
import { Success } from './pages/Success';
import { useState } from 'react';

function App() {
  const [response, setResponse] = useState({});

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Buy setResponse={setResponse} />}
        />
        <Route
          path="success"
          element={<Success response={response} />}
        />
      </Routes>
    </div>
  );
}

export default App;
