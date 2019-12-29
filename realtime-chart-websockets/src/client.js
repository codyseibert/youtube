import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

const App = ({}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('entry', entry => {
      setData(d => [...d, entry].slice(-10, 10));
    });
  }, []);
  return (
    <div>
      <h1>Real Time Chart Updates</h1>
      <LineChart width={600} height={400} data={data}>
        <XAxis dataKey="amount" />
        <YAxis />
        <Tooltip />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
