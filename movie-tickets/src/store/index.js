import Vue from 'vue';
import Vuex from 'vuex';

const movies = [
  {
    id: '1',
    title: '1Bad Boys for Life',
    description: 'A movie with Will Smith',
    showtimes: ['10:00am', '2:00pm']
  },
  {
    id: '2',
    title: '2Bad Boys for Life',
    description: 'A movie with Will Smith',
    showtimes: ['10:00am', '2:00pm']
  },
  {
    id: '3',
    title: '3Bad Boys for Life',
    description: 'A movie with Will Smith',
    showtimes: ['10:00am', '2:00pm']
  },
  {
    id: '4',
    title: '4Bad Boys for Life',
    description: 'A movie with Will Smith',
    showtimes: ['10:00am', '2:00pm']
  }
];

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    movies: [],
    movie: {},
    tickets: {
      adult: 0,
      children: 0,
      seniors: 0
    }
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setMovie(state, movie) {
      state.movie = movie;
    },
    incrementTickets(state, ticket) {
      state.tickets[ticket] = state.tickets[ticket] + 1;
    },
    decrementTickets(state, ticket) {
      state.tickets[ticket] = Math.max(
        0,
        state.tickets[ticket] - 1
      );
    }
  },
  actions: {
    fetchMovie({ commit }, id) {
      commit(
        'setMovie',
        movies.find(movie => movie.id === id)
      );
    },
    fetchMovies({ commit }) {
      commit('setMovies', movies);
    }
  }
});
