<template>
  <div class="submit-idea">
    <h1>Submit an Idea</h1>
    <form @submit="_submitIdea">
      <textarea @change="_setForm"></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setForm']),
    ...mapActions(['createIdea']),
    _setForm(event) {
      this.setForm({
        key: 'idea',
        value: event.target.value
      });
    },
    _submitIdea(event) {
      event.preventDefault();
      this.createIdea();
    }
  }
};
</script>

<style scoped>
textarea {
  width: 400px;
  height: 200px;
  font-size: 24px;
}
</style>
