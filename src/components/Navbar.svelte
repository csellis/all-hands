<script>
  import { supabase } from "../services/supabase";


    function handleLogout() {
        supabase.auth.signOut();
    }
</script>

<div class="flex justify-between">
    <h1>
        All Hands
    </h1>

    <div class="flex gap-4">
        <button on:click={handleLogout} class="px-4 py-2 bg-white" type="button">Logout</button>
    </div>
</div>