import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Messages = writable();

export const loadMessages = async () => {
  const { data, error } = await supabase.from("Messages").select();
  if (error) {
    console.error(error);
  }
  Messages.set(data);
};

export const messagesSubscription = supabase
  .from("Messages")
  .on("*", (payload) => {
    console.log("Change received!", payload);
    // if (payload.eventType === "UPDATE") {
    //   Settings.set([payload.new]);
    // }
  })
  .subscribe();

export const updateMessage = async (id, payload) => {
  const { data, error } = await supabase
    .from("Messages")
    .update(payload)
    .match({ id });
  if (error) console.error(error);
};

export const insertMessage = async (room_id, message) => {
  const user = supabase.auth.user();
  const user_id = user?.id;
  const payload = {
    room_id,
    message,
    user_id,
  };
  const { data, error } = await supabase.from("Messages").insert(payload);

  console.log({ data });
  // Messages.update((existing) => [...existing, data.])
};
