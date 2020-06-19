import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errorMap = {};
    if (!email) {
      errorMap.email = 'Email must be provided';
    }
    if (!password) {
      errorMap.password = 'Password must be provided';
    }
    setErrors(errorMap);
  };

  const submit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <div class="form-group">
          <label>Email address</label>
          <input
            class="form-control"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.currentTarget.value)
            }
          ></input>
          <small
            id="emailHelp"
            class="form-text text-danger"
          >
            {errors.email}
          </small>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            onChange={validate}
            class="form-control"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.currentTarget.value)
            }
            type="password"
          ></input>
          <small class="form-text text-danger">
            {errors.password}
          </small>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
