<script>
  import { Rooms, loadRooms } from "../stores/rooms";
  import { Settings, updateSettings } from "../stores/settings";

  loadRooms();
  $: currentRoom =
    $Rooms &&
    $Rooms.length > 0 &&
    $Settings &&
    $Rooms.find((room) => room.id === $Settings[0].current_room);

  function setRoom(room) {
    updateSettings($Settings[0].id, { current_room: room.id });
  }
</script>

<h2>Current Room: {currentRoom?.name}</h2>

<div class="flex flex-col gap-4">
  {#each $Rooms as room}
    <button
      on:click={() => setRoom(room)}
      class="bg-blue-300 max-w-xs cursor-pointer px-4 py-2 rounded-md"
    >
      {room.name}
    </button>
  {/each}
</div>
