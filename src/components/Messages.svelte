<script>
  export let selectedRoom;
  let message;
  let firstLoad = true;
  import { insertMessage, loadMessages, Messages } from "../stores/messages";
  $: {
    if (selectedRoom && firstLoad) {
      loadMessages(selectedRoom?.id);
      firstLoad = false;
    }
  }

  async function handleSubmit() {
    let result = await insertMessage(selectedRoom?.id, message);
    if (result?.succeess) {
      message = "";
    }
  }
</script>

<ul>
  {#each $Messages as message}
    <li>{message.message}</li>
  {/each}
</ul>

<form on:submit|preventDefault={handleSubmit} class="">
  <input class="" bind:value={message} type="text" />
  <button type="submit" class="">Send</button>
</form>
