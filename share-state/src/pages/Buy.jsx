import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../api/sendRequest';

export const Buy = ({ setResponse }) => {
  const navigate = useNavigate();

  const submitForm = () => {
    sendRequest()
      .then(setResponse)
      .then(() => {
        navigate('/success');
      });
  };

  return (
    <div>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};
