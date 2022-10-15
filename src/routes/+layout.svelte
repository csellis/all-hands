<script>
  import "../app.css";
  import { user } from "../stores/auth";
  import { supabase } from "../services/supabase";
  import { loadRooms, Rooms } from "../stores/rooms";

  import Auth from "../components/Auth.svelte";
  import Navbar from "../components/Navbar.svelte";
  import { loadSettings, Settings } from "../stores/settings";
  import ChannelManager from "../components/ChannelManager.svelte";

  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user);

    if (session?.user) {
      loadRooms();
    }
  });
  let firstLoad = true;
  $: {
    if (firstLoad) {
      loadSettings();
      loadRooms();
      firstLoad = false;
    }
  }
</script>

<div class="bg-yellow-50 min-h-screen">
  <main class="max-w-screen-xl pt-4 mx-auto">
    {#if $user}
      <Navbar />
      <slot />
    {:else}
      <Auth />
    {/if}
  </main>
</div>
