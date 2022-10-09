<script>
    import {loadRooms, Rooms} from '../../stores/rooms';
    import Plyr from 'plyr';

    let playerEl
    let player
    let firstLoad = true;
    let selectedRoom = null

    $: {
        if(firstLoad) {
            loadRooms();
            if($Rooms.length > 0) {
                selectedRoom = $Rooms[0]
            }
                console.log(selectedRoom)
            firstLoad = false;
        }
        if(playerEl && !player) {
            // player = new 
            player = new Plyr(playerEl)
            handleSelectRoom($Rooms[0])
        }
    }

    function handleSelectRoom(room) {
        selectedRoom = room;
        if(player) {
            player.sources = [{
                type: 'video',
                sources: [
                    {
                    src: room?.videoUrl,
                    provider: 'youtube',
                    },
                ],
            }];
        } else {
            console.warn('No player')
        }
    }

    $: youtubeVideo = `${selectedRoom?.videoUrl}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1&amp;autoplay=1`

</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.2/plyr.css" />
</svelte:head>

<div class="grid gap-4 grid-cols-12 max-w-screen-lg w-full mx-auto">
    <ul class="col-span-3 bg-slate-200 rounded-md shadow-lg">
        {#each $Rooms as Room}
            <li class="px-4 py-2">
            <button on:click="{() =>handleSelectRoom(Room)}" class="">
                {Room.name}
            </button>
            </li>
        {/each}
    </ul>

    <div class="col-span-9 bg-slate-200 rounded-md shadow-lg min-h-[50vh] p-4">
        {#if selectedRoom}
            <h2 class="text-xl text-slate-800">{selectedRoom.name}</h2>

            <div class="plyr__video-embed" id="player" bind:this={playerEl}>
                {#key youtubeVideo}
                <iframe
                id="youtube"
                  src="{youtubeVideo}"
                  title="{selectedRoom?.name}"
                  class="h-auto rounded-lg shadow-md overflow-hidden w-full mt-4 min-h-[50vh]"
                  allowfullscreen
                  allowtransparency
                  autoplay
                  allow="autoplay"
                ></iframe>
                {/key}
              </div>
        {/if}
    </div>
</div>
