<script>
  let isDrank = false;

  function drink() {
    isDrank = !isDrank;
  }
</script>

<style>
  button {
    display: inline-block;
    background-color: white;
    padding: 10px;
    font-size: 24px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-right: 20px;
    cursor: pointer;
  }

  .drank {
    background-color: blue;
    color: white;
  }
</style>

<button class:drank={isDrank} on:click={drink}>WATER</button>
