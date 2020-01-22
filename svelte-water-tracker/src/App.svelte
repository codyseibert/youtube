<script>
  import WaterButton from "./WaterButton.svelte";

  const waters = new Array(8).fill({});
</script>

<style>
  #wrapper {
    text-align: center;
  }
</style>

<div id="wrapper">
  {#each waters as water}
    <WaterButton />
  {/each}
</div>
