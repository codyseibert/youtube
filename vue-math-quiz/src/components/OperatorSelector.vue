<template>
  <div>
    <button @click="$emit('changeOperator', '+')">
      Addition
      <br />+
    </button>
    <button @click="$emit('changeOperator', '-')">
      Subtraction
      <br />-
    </button>
    <button @click="$emit('changeOperator', '/')">
      Division
      <br />/
    </button>
    <button @click="$emit('changeOperator', '*')">
      Multiplication
      <br />*
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>