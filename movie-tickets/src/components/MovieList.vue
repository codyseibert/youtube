<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h1>Movie List</h1>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <MovieCard v-for="movie in getMovies(0)" :key="movie.title" :movie="movie" />
      </b-col>
      <b-col>
        <MovieCard v-for="movie in getMovies(1)" :key="movie.title" :movie="movie" />
      </b-col>
      <b-col>
        <MovieCard v-for="movie in getMovies(2)" :key="movie.title" :movie="movie" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MovieCard from "./MovieCard.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    MovieCard
  },
  methods: {
    ...mapActions(["fetchMovies"])
  },
  mounted() {
    this.fetchMovies();
  },
  computed: {
    ...mapState({
      getMovies: state => col => {
        return state.movies.filter((_, i) => i % 3 === col);
      }
    })
  }
};
</script>

<style>
</style>