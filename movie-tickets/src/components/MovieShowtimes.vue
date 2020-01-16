<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h1>Movie Showtimes</h1>
        <h3>{{movie.title}}</h3>
        <div>
          <b-button
            v-for="showtime in movie.showtimes"
            :key="showtime"
            :href="`/movies/${movie.id}/showtimes/${showtime}`"
            variant="primary"
          >{{showtime}}</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["movie"])
  },
  mounted() {
    this.fetchMovie(this.$route.params.id);
  },
  methods: {
    ...mapActions(["fetchMovie"])
  }
};
</script>

<style>
</style>