import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadPokemon } from './reducers/pokemon';

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector(
    (state) => state.pokemon.pokemon
  );

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/">
            <div onClick={() => dispatch(loadPokemon())}>
              HOME
              {pokemon.map((poke) => (
                <div>{poke.name}</div>
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
