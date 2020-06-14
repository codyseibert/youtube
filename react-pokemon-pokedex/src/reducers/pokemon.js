const LOADED = 'pokedex/pokemon/LOADED';

const initialState = {
  pokemon: [],
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
      };
    default:
      return state;
  }
}

export function pokemonLoaded(pokemon) {
  return { type: LOADED, payload: pokemon };
}

export function loadPokemon() {
  return (dispatch) =>
    dispatch(pokemonLoaded([{ name: 'pikachu' }]));
}
