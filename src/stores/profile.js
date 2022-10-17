import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const profile = writable({});

export const loadProfile = async () => {
  const { data: data, error } = await supabase.from("users").select().single().match({
    id: supabase.auth.user().id,
  });
  const { data: roles, error: rolesError } = await supabase.from("user_roles").select();

  if (error && rolesError) {
    console.error(error);
  }
  // console.log("profile", data, roles);
  if (data && roles) {
    let response = {
      ...data,
      roles: roles.map((role) => role.role),
    };
    profile.set(response);
  }
  return;
};
