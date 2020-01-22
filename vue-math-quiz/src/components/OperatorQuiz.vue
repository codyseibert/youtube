<template>
  <div>
    <div v-if="isQuizStarted">
      <h4>{{operandLeft}} {{operator}} {{operandRight}}</h4>

      <button
        @click="selectAnswer(answer)"
        v-for="(answer, index) of answers"
        :key="index"
      >{{answer}}</button>
    </div>

    <div v-if="!isQuizStarted">
      <button @click="startQuiz">Start</button>
    </div>
    <button @click="$emit('onBack')">Back</button>
  </div>
</template>

<script>
export default {
  props: ["operator"],
  data() {
    return {
      isQuizStarted: false,
      operandLeft: null,
      operandRight: null,
      answers: [],
      expectedAnswer: null
    };
  },
  methods: {
    selectAnswer(answerSelected) {
      if (answerSelected !== this.expectedAnswer) {
        alert("WRONG ANSWER");
      }
      this.startQuiz();
    },
    startQuiz() {
      this.isQuizStarted = true;
      this.operandLeft = parseInt(Math.random() * 13);
      this.operandRight = parseInt(Math.random() * 13);

      const methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "/": (a, b) => a / b,
        "*": (a, b) => a * b
      };

      const methodToUse = methods[this.operator];

      this.answers = [];
      this.answers.push(methodToUse(this.operandLeft, this.operandRight + 1));
      this.answers.push(methodToUse(this.operandLeft + 1, this.operandRight));
      this.answers.push(
        methodToUse(this.operandLeft + 1, this.operandRight + 1)
      );
      this.answers.push(
        methodToUse(this.operandLeft - 1, this.operandRight + 1)
      );
      this.answers.push(methodToUse(this.operandLeft, this.operandRight - 1));

      const expectedAnswer = methodToUse(this.operandLeft, this.operandRight);
      this.answers[
        parseInt(Math.random() * this.answers.length)
      ] = expectedAnswer;
      this.expectedAnswer = expectedAnswer;
    }
  }
};
</script>

<style>
</style>