import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import App from "./App.vue";
import Login from "./components/Login.vue";
import Welcome from "./components/Welcome.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Welcome },
    { path: "/login", component: Login },
  ],
});

new Vue({
  render: (h) => h(App),
  store: store,
  router,
}).$mount("#app");
