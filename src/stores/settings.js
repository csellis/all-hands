import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Settings = writable();

export const loadSettings = async () => {
  const { data, error } = await supabase.from("Settings").select();
  if (error) {
    console.error(error);
  }
  Settings.set(data);
};

export const settingsSubscription = supabase
  .from("Settings")
  .on("*", (payload) => {
    console.log("Change received!", payload);
    if (payload.eventType === "UPDATE") {
      Settings.set([payload.new]);
    }
  })
  .subscribe();

export const updateSettings = async (id, payload) => {
  const { data, error } = await supabase
    .from("Settings")
    .update(payload)
    .match({ id });
  if (error) console.error(error);
};
