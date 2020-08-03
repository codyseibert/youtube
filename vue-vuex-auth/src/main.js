import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount("#app");
