<template>
  <div>
    <v-row>
      <v-col
        ><v-card
          v-for="idea in ideas"
          :key="idea._id"
          class="mb-4"
          max-width="344"
          outlined
        >
          <v-card-text>
            {{ idea.idea }}
          </v-card-text>

          <v-card-actions>
            <v-btn @click="upVoteIdea(idea)">Up Vote</v-btn>
            <div class="ml-4 mr-4">{{ idea.votes }}</div>
            <v-btn @click="downVoteIdea(idea)">Down Vote</v-btn>
          </v-card-actions>
        </v-card></v-col
      >
      <v-col>
        <v-btn
          @click="$router.push('/create-idea')"
          light
          color="blue"
          class="white--text"
          >Add New Idea</v-btn
        >
      </v-col>
    </v-row>
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
