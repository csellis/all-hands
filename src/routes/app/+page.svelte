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

  $: youtubeVideo = `${selectedRoom?.videoUrl}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1&amp;autoplay=1`;
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.2/plyr.css" />
</svelte:head>

{#if selectedRoom && youtubeVideo}
  <div transition:fade={{ duration: 150 }}>
    <h2 class="text-xl text-slate-800">{selectedRoom.name}</h2>

    <div class="plyr__video-embed" id="player" bind:this={playerEl}>
      {#key youtubeVideo}
        <iframe
          id="youtube"
          src={youtubeVideo}
          title={selectedRoom?.name}
          class="h-auto rounded-lg shadow-md overflow-hidden w-full mt-4 min-h-[50vh]"
          allowfullscreen
          allowtransparency
          autoplay
          allow="autoplay"
        />
      {/key}
    </div>
  </div>
{/if}
