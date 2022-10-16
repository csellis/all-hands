<script>
  export let profile, showForRole;

</script>

<div>
  {#if profile && showForRole && profile.role === showForRole}
    <slot />
  {/if}
</div>
