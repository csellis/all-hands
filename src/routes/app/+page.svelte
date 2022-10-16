<script>
  import Plyr from "plyr";
  import { fade } from "svelte/transition";
  import { loadRooms, Rooms } from "../../stores/rooms";
  import { Settings } from "../../stores/settings";

  let playerEl;
  let player;
  let selectedRoom = null;

  $: selectedRoom =
    $Rooms &&
    $Rooms.length > 0 &&
    $Settings &&
    $Rooms.find((room) => room.id === $Settings[0].current_room);

  $: {
    if (playerEl && !player) {
      // player = new
      player = new Plyr(playerEl);
    }
  }


</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.2/plyr.css" />
</svelte:head>

<div>
  {#if selectedRoom}
  {#key selectedRoom}
  <div transition:fade={{ duration: 150 }} class="max-w-screen-lg mx-auto">
    <h2 class="text-xl text-slate-800">{selectedRoom.name}</h2>
    
    <div class="plyr__video-embed w-full" id="player" bind:this={playerEl}>
        <iframe
        id="youtube"
        src={selectedRoom?.videoUrl}
        title={selectedRoom?.name}
        class="rounded-lg shadow-md overflow-hidden mt-4"
        allowtransparency
        frameborder="0"
        allow="autoplay"
        style="position: relative;"
        />
    </div>
  </div>
  {/key}
  {/if}
</div>

<style>
  .plyr, .plyr .plyr__video-embed iframe, #youtube { max-height: 100vh; }
</style>