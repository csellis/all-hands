import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Profile = writable({});

export const loadProfile = async () => {
  const { data: profile, error } = await supabase.from("profiles").select("id, role").single();
  if (error) {
    console.error(error);
  }

  if (profile) {
    Profile.set(profile);
  }
  return;
};
