<script lang="ts">
  let startTime: number = Date.now();
  let elapsedTime: number = 0;
  let interval: number = null;

  enum STATE {
    PAUSED,
    NEW,
    RUNNING,
  }

  let state: STATE = STATE.NEW;

  const pad2 = (number: number) => `00${number}`.slice(-2);
  const pad3 = (number: number) => `000${number}`.slice(-3);

  $: hours = pad2(Math.floor(elapsedTime / 3600 / 1000) % 60);
  $: minutes = pad2(Math.floor(elapsedTime / 60 / 1000) % 60);
  $: seconds = pad2(Math.floor(elapsedTime / 1000) % 60);
  $: millis = pad3(Math.floor(elapsedTime % 1000));
  $: time = `${hours}:${minutes}:${seconds}.${millis}`;

  const start = () => {
    startTime = Date.now();
    state = STATE.RUNNING;

    interval = setInterval(() => {
      if (state === STATE.RUNNING) {
        const nowTime = Date.now();
        elapsedTime = nowTime - startTime;
      }
    });
  };

  const pause = () => {
    state = STATE.PAUSED;
  };

  const resume = () => {
    state = STATE.RUNNING;
  };

  const reset = () => {
    clearInterval(interval);
    state = STATE.NEW;
    elapsedTime = 0;
  };
</script>

<div
  class="bg-gradient-to-br from-green-400 to-blue-500 flex flex-col justify-center items-center h-screen"
>
  <div class="w-2/3 glass p-10">
    <h1 class="text-green-200 border-b border-white text-4xl mb-4">
      Super Stop Watch
    </h1>
    <div class="text-white text-left mb-4 text-xl">
      <h1>Elapsed Time: {time}</h1>
    </div>
    <div class="text-right">
      {#if state === STATE.NEW}
        <button
          class="border-green-100 text-green-100 mr-2 p-1 px-2 border rounded"
          on:click={start}>Start</button
        >
      {/if}

      {#if state === STATE.PAUSED || state === STATE.RUNNING}
        <button
          on:click={reset}
          class="text-red-700 border-red-700 mr-2 p-1 px-2 border rounded"
          >Reset</button
        >
      {/if}

      {#if state === STATE.PAUSED}
        <button
          on:click={resume}
          class="text-yellow mr-2 p-1 px-2 border border-gray-800 rounded"
          >Resume</button
        >
      {/if}

      {#if state === STATE.RUNNING}
        <button
          on:click={pause}
          class="mr-2 p-1 px-2 border border-black rounded">Pause</button
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
