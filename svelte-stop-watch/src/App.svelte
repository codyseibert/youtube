<script lang="ts">
  enum STATE {
    NEW,
    RUNNING,
    PAUSED,
  }

  let state: STATE = STATE.NEW;
  let startTime: number = 0;
  let elaspedTime: number = 0;
  let oldElapsedTime: number = 0;
  let interval: number;

  const pad2 = (number: number) => `00${number}`.slice(-2);
  const pad3 = (number: number) => `000${number}`.slice(-3);

  $: hours = pad2(Math.floor(elaspedTime / 1000 / 60 / 60) % 60);
  $: minutes = pad2(Math.floor(elaspedTime / 1000 / 60) % 60);
  $: seconds = pad2(Math.floor(elaspedTime / 1000) % 60);
  $: millis = pad3(elaspedTime % 1000);
  $: formattedElaspedTime = `${hours}:${minutes}:${seconds}.${millis}`;

  const start = () => {
    startTime = Date.now();
    state = STATE.RUNNING;
    interval = setInterval(() => {
      if (state === STATE.RUNNING) {
        const endTime = Date.now();
        elaspedTime = endTime - startTime + oldElapsedTime;
      }
    });
  };

  const reset = () => {
    elaspedTime = 0;
    state = STATE.NEW;
    clearInterval(interval);
  };

  const pause = () => {
    state = STATE.PAUSED;
    oldElapsedTime = elaspedTime;
  };

  const resume = () => {
    startTime = Date.now();
    state = STATE.RUNNING;
  };
</script>

<div
  class="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-green-400"
>
  <div class="glass w-1/3 h-36 p-4">
    <h1 class="mb-2 text-2xl text-yellow-100 border-b border-white">
      Super Stop Watch
    </h1>

    <p class="mb-2 text-xl text-white">Elapsed Time: {formattedElaspedTime}</p>

    <div class="text-right">
      {#if state === STATE.NEW}
        <button
          on:click={start}
          class="mr-2 text-xl px-2 border-green-200 border rounded text-green-200"
          >Start</button
        >
      {/if}
      {#if state === STATE.RUNNING || state === STATE.PAUSED}
        <button
          on:click={reset}
          class="mr-2 text-xl px-2 border-red-500 border rounded text-red-500"
          >Reset</button
        >
      {/if}
      {#if state === STATE.RUNNING}
        <button
          on:click={pause}
          class="mr-2 text-xl px-2 border-white border rounded text-white"
          >Pause</button
        >
      {/if}
      {#if state === STATE.PAUSED}
        <button
          on:click={resume}
          class="text-xl px-2 border-black border rounded text-black"
          >Resume</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  .glass {
    background: rgba(255, 235, 233, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(5px);
    border-radius: 10px;
  }
</style>
