import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = ({}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('we are here');
    axios
      .get('http://localhost:5000/users')
      .then(({ data: users }) => {
        console.log('users', users);
        setUsers(users);
      });
  }, []);

  return (
    <div>
      <h1>TYPR</h1>
      {users.map(user => (
        <div key={user.name}>{user.name}</div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
