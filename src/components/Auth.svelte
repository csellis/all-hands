<script>
    import {supabase} from '../services/supabase'
    let state = 'fresh'
    let email

    async function handleLogin() {
        try {
            const {error} = await supabase.auth.signIn({email});
            if(error) throw error;
            alert('check your email for the link')
        } catch (error) {
            console.error(error)
        }
    }
</script>

<h1>Login</h1>

<p>Sign in with your magic link with your email below.</p>


<form class="p-6 bg-red-200" method="post" on:submit|preventDefault="{handleLogin}">
    <input type="email" bind:value={email} />

    <button type="submit">Login</button>
</form>