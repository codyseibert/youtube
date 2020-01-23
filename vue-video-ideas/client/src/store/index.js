import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

export default new Vuex.Store({
  state: {
    form: {
      // idea: ''
    }
  },
  mutations: {
    setForm(state, { key, value }) {
      state.form[key] = value;
    }
  },
  actions: {
    async createIdea(context) {
      // TODO: wrap in a service helper
      const response = await axios.post(
        'http://localhost:5000/ideas',
        context.state.form
      );
      const { data } = response;
      console.log('data', data);
      // TODO: redirect to the main ideas list route
    }
  },
  modules: {}
});
