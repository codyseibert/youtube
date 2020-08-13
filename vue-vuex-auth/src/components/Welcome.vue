<template>
  <div>
    Welcome
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <button @click="sayHi">SAY HI</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: "token",
    }),
  },
  methods: {
    sayHi() {
      fetch("http://localhost:3000/hi", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    },
  },
};
</script>

<style></style>
