import React from 'react';

export const Success = ({ response }) => {
  return (
    <div>
      Success name: {response.name}
      age: {response.age}
    </div>
  );
};
