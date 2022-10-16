<script>
  import { supabase } from "../services/supabase";
  import { Profile } from "../stores/profile";
  import AuthShield from "./AuthShield.svelte";


    function handleLogout() {
        supabase.auth.signOut();
    }
</script>

<div class="flex justify-between">
    <h1>
        <a href="/" class="text-2xl font-bold text-gray-900">All Hands</a>
    </h1>

    <div class="flex gap-4">
        <AuthShield profile={$Profile} showForRole="ADMIN">
            <a href="/admin/settings" class="text-blue-500">Settings</a>
        </AuthShield>
        <button on:click={handleLogout} class="px-4 py-2 bg-white" type="button">Logout</button>
    </div>
</div>