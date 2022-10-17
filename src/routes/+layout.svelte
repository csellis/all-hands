<script>
  import "../app.css";
  import { user } from "../stores/auth";
  import { supabase } from "../services/supabase";

  import Auth from "../components/Auth.svelte";
  import Navbar from "../components/Navbar.svelte";

  import { loadRooms, Rooms } from "../stores/rooms";
  import { loadSettings, Settings } from "../stores/settings";
  import { loadProfile, profile } from "../stores/profile";

  let firstLoad = true;

  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user);

    if (session?.user) {
      loadRooms();
      loadProfile();
    }
  });
  $: {
    if (firstLoad) {
      loadSettings();
      loadRooms();
      firstLoad = false;
    }

    if ($user && Object.keys($user).length > 0 && Object.keys($profile).length === 0) {
      loadProfile();
    }
  }

  // $: {
  //   console.log("profile", $profile);
  // }
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
