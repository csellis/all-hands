<script>
  import { user } from "../stores/auth";
  export let selectedRoom;
  let message;
  let firstLoad = true;
  import { deleteMessage, insertMessage, loadMessages, Messages } from "../stores/messages";
  $: {
    if (selectedRoom && firstLoad) {
      loadMessages(selectedRoom?.id);
      firstLoad = false;
    }
  }

  async function handleSubmit() {
    message = message.trim();
    if (message.length > 0) {
      let result = await insertMessage(selectedRoom?.id, message);
      if (result?.succeess) {
        message = "";
      }
    }
  }

  function reverseCard(array) {
    return array.slice().reverse();
  }

  $: userMessages = $Messages.map((message) => {
    return {
      ...message,
      isUser: message.users.id === $user.id,
    };
  });
  // $: console.table(userMessages);
  // $: console.log($user);
  function formatDate(date) {
    // return relative date
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  function removeMessage(id) {
    console.log("remove message", id);
    deleteMessage(id);
  }
</script>

<div class="col-span-3 bg-slate-200 rounded-md shadow-lg p-4 flex flex-col">
  <ul class="flex-1 max-h-[70vh] overflow-y-auto flex flex-col-reverse">
    {#each reverseCard(userMessages) as message}
      <li class="grid grid-cols-6" title={formatDate(message.inserted_at)}>
        <div class="flex items-center justify-between col-span-4 {message.isUser ? 'col-start-3' : ''}">
          <span class="ml-2 text-sm text-gray-500">
            {message.users.username}
            {message?.isUser ? " (you)" : ""}
          </span>
          {#if message.isUser}
            <button class="text-gray-500 hover:text-gray-700" on:click={() => removeMessage(message.id)}>
              <svg class="w-4 h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
        <div class="flex bg-white rounded-md shadow-md p-4 mb-4 flex flex-col col-span-4 {message.isUser ? 'col-start-3 bg-blue-600 text-white' : ''}">
          <span class="ml-2 text-sm">{message.message}</span>
        </div>
      </li>
    {/each}
  </ul>

  <form on:submit|preventDefault={handleSubmit} class="grid grid-cols-6 gap-2">
    <input class=" col-span-5 rounded py-2 px-3" bind:value={message} type="text" />
    <button type="submit" class="">Send</button>
  </form>
</div>
