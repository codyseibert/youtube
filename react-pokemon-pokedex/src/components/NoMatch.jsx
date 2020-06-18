import React from 'react';
import { useSelector } from 'react-redux';

export const NoMatch = () => {
  const pokemon = useSelector(
    (state) => state.pokemon.search
  );
  return (
    <div className="box">
      <div>
        <h3>NO POKEMON FOUND NAMED:</h3>
        <h4>{pokemon}</h4>
        <p>Search again...</p>
      </div>
    </div>
  );
};
