<script>
  import { supabase } from "../services/supabase";
  import { page } from "$app/stores";

  let state = "fresh";
  let email;

  async function handleLogin() {
    state = "loading";
    try {
      const { error } = await supabase.auth.signIn(
        { email },
        {
          redirectTo: $page.url.origin,
        }
      );
      if (error) {
        state = "error";
        throw error;
      } else {
        state = "success";
        alert("check your email for the link");
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<h1>Login</h1>

<p>Sign in with your magic link with your email below.</p>

<form
  class="p-6 bg-red-200"
  method="post"
  on:submit|preventDefault={handleLogin}
>
  <input type="email" bind:value={email} />

  <button
    type="submit"
    disabled={state === "loading"}
    class="border-2 border-black rounded px-4 py-2 {state === 'loading'
      ? 'cursor-wait opacity-50'
      : ''}">Login</button
  >
</form>
