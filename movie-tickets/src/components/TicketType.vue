<template>
  <h3>
    {{ type }}
    <b-button
      @click="incrementTickets(type)"
      variant="primary"
      >+</b-button
    >
    {{ tickets[type] }}
    <b-button
      @click="decrementTickets(type)"
      variant="primary"
      >-</b-button
    >
  </h3>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['tickets'])
  },
  props: ['type'],
  methods: {
    ...mapMutations([
      'incrementTickets',
      'decrementTickets'
    ])
  }
};
</script>

<style></style>
