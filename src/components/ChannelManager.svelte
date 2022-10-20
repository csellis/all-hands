<script>
  import { Rooms, loadRooms, currentRoom } from "../stores/rooms";

  loadRooms();
</script>

<h2>Current Room: {$currentRoom?.name}</h2>

<div class="flex flex-col gap-4">
  {#each $Rooms as room}
    <button
      class="bg-blue-300 max-w-xs cursor-pointer px-4 py-2 rounded-md"
    >
      {room.name}
    </button>
  {/each}
</div>
