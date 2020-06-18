import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPokemon } from '../reducers/pokemon';
import { useParams } from 'react-router-dom';

export const Pokemon = () => {
  const pokemon = useSelector(
    (state) => state.pokemon.pokemon
  );
  const isLoading = useSelector(
    (state) => state.pokemon.isLoading
  );
  const { pokemonName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemon) dispatch(loadPokemon(pokemonName));
  }, [dispatch, pokemon, pokemonName]);

  return (
    <div>
      {!isLoading && pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
      )}
      {isLoading && <h1 className="loading">LOADING...</h1>}
    </div>
  );
};
