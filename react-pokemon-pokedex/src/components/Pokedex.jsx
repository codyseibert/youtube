import React, { useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import { NoMatch } from './NoMatch';
import { Pokemon } from './Pokemon';
import { Welcome } from './Welcome';
import { loadPokemon } from '../reducers/pokemon';
import { useDispatch } from 'react-redux';

export const Pokedex = () => {
  const [pokemonName, setPokemonName] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="box">
      <div className="pokedex">
        <Switch>
          <Route
            exact
            path="/pokemon/:pokemonName"
            component={Pokemon}
          />
          <Route exact path="/" component={Welcome} />
          <Route component={NoMatch} />
        </Switch>
        <div></div>

        <div className="box">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(loadPokemon(pokemonName));
            }}
          >
            <input
              onChange={(e) => {
                setPokemonName(e.currentTarget.value);
              }}
              placeholder="Enter a pokemon name"
            ></input>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};
