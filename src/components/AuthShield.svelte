<script>
  export let profile, showForRole;
</script>

<div>
  {#if profile && profile.roles && showForRole && profile?.roles.includes(showForRole)}
    <slot />
  {/if}
</div>
