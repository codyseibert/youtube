<template>
  <div class="submit-idea">
    <h1>Submit an Idea</h1>
    <form @submit="_submitIdea">
      <v-textarea
        outlined
        @change="_setForm"
        name="input-7-4"
        label="Idea Description"
      ></v-textarea>
      <v-btn type="submit" color="success" class="white--text">Submit</v-btn>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setForm']),
    ...mapActions(['createIdea']),
    _setForm(value) {
      this.setForm({
        key: 'idea',
        value
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
