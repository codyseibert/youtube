import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as ideasService from '../services/ideas';

import router from '../router';

export default new Vuex.Store({
  state: {
    form: {},
    ideas: []
  },
  mutations: {
    setForm(state, { key, value }) {
      state.form[key] = value;
    },
    setIdeas(state, ideas) {
      state.ideas = ideas;
    },
    setIdea(state, updatedIdea) {
      Object.assign(
        state.ideas.find(idea => idea._id === updatedIdea._id),
        updatedIdea
      );
    }
  },
  actions: {
    async createIdea(context) {
      await ideasService.createIdea(context.state.form);
      router.push('/');
    },
    async getIdeas(context) {
      const ideas = await ideasService.getIdeas();
      context.commit('setIdeas', ideas);
    },
    async upVoteIdea(context, idea) {
      const updatedIdea = await ideasService.upVoteIdea(idea._id);
      context.commit('setIdea', updatedIdea);
    },
    async downVoteIdea(context, idea) {
      const updatedIdea = await ideasService.downVoteIdea(idea._id);
      context.commit('setIdea', updatedIdea);
    }
  },
  modules: {}
});
