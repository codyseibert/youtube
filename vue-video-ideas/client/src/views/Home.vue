<template>
  <div>
    <router-link to="/create-idea">Add New Idea</router-link>
    <div v-for="idea in ideas" :key="idea._id">
      {{ idea.idea }}
      <button @click="upVoteIdea(idea)">up vote</button>
      {{ idea.votes }}
      <button @click="downVoteIdea(idea)">down vote</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'home',
  created() {
    this.getIdeas();
  },
  components: {},
  methods: {
    ...mapActions(['getIdeas', 'upVoteIdea', 'downVoteIdea'])
  },
  computed: {
    ...mapState(['ideas'])
  }
};
</script>
