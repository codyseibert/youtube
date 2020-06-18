import { push } from 'connected-react-router';
const LOADED = 'pokedex/pokemon/LOADED';
const SET_SEARCH = 'pokedex/pokemon/SET_SEARCH';

const initialState = {
  pokemon: null,
  search: '',
  isLoading: false,
};

export default function reducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        pokemon: action.payload,
        isLoading: false,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function pokemonLoaded(pokemon) {
  return { type: LOADED, payload: pokemon };
}

export function setSearch(pokemon) {
  return { type: SET_SEARCH, payload: pokemon };
}

export function loadPokemon(name) {
  return (dispatch) => {
    dispatch(setSearch(name));
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((pokemon) => {
        dispatch(pokemonLoaded(pokemon));
        dispatch(push(`/pokemon/${pokemon.name}`));
      })
      .catch(() => {
        dispatch(push('/not-found'));
      });
  };
}
