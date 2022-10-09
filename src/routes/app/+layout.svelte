<script>
  import { goto } from "$app/navigation";
  import { user } from "../../stores/auth";


    if(!$user) {
        console.log('no user');
        goto('/')
    }
</script>

<slot />