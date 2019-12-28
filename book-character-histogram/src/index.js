import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import book from './book.txt';

// 1. load in the book text using fetch
fetch(book)
  .then(result => result.text())
  .then(text => {
    // 2. make an internal histogram of the characters
    const characters = {};
    for (const char of text) {
      const charLowerCase = char.toLowerCase();
      characters[charLowerCase] =
        (characters[charLowerCase] || 0) + 1;
    }

    // 3. filter for a-z
    const data = Object.keys(characters)
      .map(key => {
        return {
          key,
          value: characters[key]
        };
      })
      .filter(entry => {
        return (
          entry.key.charCodeAt(0) >= 'a'.charCodeAt(0) &&
          entry.key.charCodeAt(0) <= 'z'.charCodeAt(0)
        );
      });

    // 4. sort the data
    data.sort((a, b) => a.key.localeCompare(b.key));

    const App = () => {
      return (
        <div>
          <h1>"Moby Dick" Character Counts</h1>
          <BarChart width={600} height={400} data={data}>
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </div>
      );
    };

    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  });
