<script>
  import { Rooms, currentRoom } from "../../../stores/rooms";
  import { Settings, updateSettings } from "../../../stores/settings";

  let currentSetting = "settings";
  let sideBarNav = ["settings"];
  let rooms = [];

  function selectedRoomStyles(room) {
    return room.id === $Settings[0].current_room;
  }

  function setRoom(room) {
    Settings.update((settings) => {
      settings[0].current_room = room.id;
      return settings;
    });
    updateSettings($Settings[0].id, { current_room: room.id });
  }
</script>

<div class="h-full">
  <main class="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside class="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        <nav class="space-y-1">
          {#each sideBarNav as nav}
            <button
              class="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium {currentSetting === nav
                ? 'bg-gray-50 text-orange-600 hover:bg-white'
                : ''}"
            >
              <span class="truncate capitalize">{nav}</span>
            </button>
          {/each}
        </nav>
      </aside>

      <!-- Settings details -->
      <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <!-- Rooms -->
        {#key $Settings}
          <section aria-labelledby="rooms-heading">
            {#if $Settings && $Settings.length > 0}
              <form action="#" method="POST">
                <div class="shadow sm:overflow-hidden sm:rounded-md">
                  <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h2 id="rooms-heading" class="text-lg font-medium leading-6 text-gray-900">Rooms</h2>
                      <p class="mt-1 text-sm text-gray-500">
                        {$currentRoom?.name}
                      </p>
                    </div>

                    <fieldset>
                      <legend class="sr-only">Rooms</legend>
                      <div class="relative -space-y-px rounded-md bg-white">
                        {#each $Rooms as room, i}
                          <label
                            class="first:rounded-t-md last:rounded-b-md relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none {selectedRoomStyles(
                              room
                            )
                              ? 'bg-orange-50 border-orange-200 z-10'
                              : 'border-gray-200'}"
                          >
                            <span class="flex items-center text-sm">
                              <input
                                on:click={() => setRoom(room)}
                                checked={selectedRoomStyles(room)}
                                type="radio"
                                name="room-plan"
                                value={room.id}
                                class="h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900"
                              />
                              <span id={`room-plans-${i}-label`} class="ml-3 font-medium text-gray-900">{room.name}</span>
                            </span>
                            <span
                              id={`room-plans-${i}-description-${i}`}
                              class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right {room.id === $Settings[0].current_room ? 'text-orange-700' : 'text-gray-500'}"
                            >
                              {room.description}
                            </span>
                          </label>
                        {:else}
                          <div class="flex items">
                            <p class="text-sm text-gray-500">No rooms found</p>
                          </div>
                        {/each}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            {:else}
              <div class="flex items-center">
                <p class="text-sm text-gray-500">Loading...</p>
              </div>
            {/if}
          </section>
        {/key}

        <!-- Billing history -->
        <!-- <section aria-labelledby="billing-history-heading">
          <div class="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
            <div class="px-4 sm:px-6">
              <h2 id="billing-history-heading" class="text-lg font-medium leading-6 text-gray-900">Billing history</h2>
            </div>
            <div class="mt-6 flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div class="overflow-hidden border-t border-gray-200">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                          <th scope="col" class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                       
                          <th scope="col" class="relative px-6 py-3 text-left text-sm font-medium text-gray-500">
                            <span class="sr-only">View receipt</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            <time datetime="2020-01-01">1/1/2020</time>
                          </td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Business Plan - Annual Billing</td>
                          <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">CA$109.00</td>
                          <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a href="#" class="text-orange-600 hover:text-orange-900">View receipt</a>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> -->
      </div>
    </div>
  </main>
</div>
