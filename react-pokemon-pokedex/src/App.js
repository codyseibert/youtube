import React, { useState } from 'react';
import './App.css';
import { Welcome } from './components/Welcome';
import { useDispatch } from 'react-redux';
import { loadPokemon } from './reducers/pokemon';
import { Switch, Route } from 'react-router-dom';
import { PokemonNotFound } from './components/PokemonNotFound';
import { Pokemon } from './components/Pokemon';

function App() {
  const [name, setName] = useState();
  const dispatch = useDispatch();

  return (
    <div class="center">
      <div className="pokedex">
        <Switch>
          <Route
            path="/not-found"
            exact
            component={PokemonNotFound}
          />
          <Route
            path="/pokemon/:pokemonName"
            exact
            component={Pokemon}
          />
          <Route component={Welcome} />
        </Switch>

        <div className="center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(loadPokemon(name));
            }}
          >
            <input
              onChange={(e) =>
                setName(e.currentTarget.value)
              }
              placeholder="Enter a pokemon name.."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
