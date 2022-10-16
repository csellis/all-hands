import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const profile = writable({});

export const loadProfile = async () => {
  const { data: data, error } = await supabase.from("users").select().single().eq("id", supabase.auth.user().id);
  if (error) {
    console.error(error);
  }
  console.log("profile", data);
  if (data) {
    profile.set(data);
  }
  return;
};
