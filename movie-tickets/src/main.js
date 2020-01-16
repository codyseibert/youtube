import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

Vue.config.productionTip = false;

import { store } from './store';

import MovieList from './components/MovieList.vue';
import MovieShowtimes from './components/MovieShowtimes.vue';
import TicketSelection from './components/TicketSelection.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MovieList
    },
    {
      path: '/movies/:id',
      component: MovieShowtimes
    },
    {
      path: '/movies/:id/showtimes/:showtime',
      component: TicketSelection
    }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
