<script>
  import { goto } from "$app/navigation";
  import ChannelManager from "../../components/ChannelManager.svelte";
  import Messages from "../../components/Messages.svelte";
  import { user } from "../../stores/auth";
  import { loadRooms, Rooms } from "../../stores/rooms";
  import { Settings } from "../../stores/settings";
  let firstLoad = true;
  $: selectedRoom = $Rooms && $Rooms.length > 0 && $Settings && $Rooms.find((room) => room.id === $Settings[0].current_room);

  if (!$user) {
    console.log("no user");
    goto("/");
  }

  if (firstLoad) {
    loadRooms();
    firstLoad = false;
  }

  // $: console.log({ selectedRoom });
</script>

<div class="grid gap-4 grid-cols-12 max-w-screen-xl w-full mx-auto">
  <div class="col-span-2 bg-slate-200 rounded-md shadow-lg">
    <ChannelManager />
  </div>
  <div class="col-span-7 bg-slate-200 rounded-md shadow-lg min-h-[50vh] p-4">
    <slot />
  </div>
  <Messages {selectedRoom} />
</div>
