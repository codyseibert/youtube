<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h1>
          Buy Tickets for {{ $route.params.showtime }}
        </h1>
        <h3>{{ movie.title }}</h3>
        <div>
          <TicketType type="adult" />
          <TicketType type="children" />
          <TicketType type="seniors" />
        </div>

        <div>
          <b-button variant="primary"
            >Buy Your Tickets</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TicketType from './TicketType.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    TicketType
  },
  computed: {
    ...mapState(['movie'])
  },
  mounted() {
    this.fetchMovie(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchMovie'])
  }
};
</script>

<style></style>
