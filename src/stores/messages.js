import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Messages = writable([]);

export const loadMessages = async (room_id) => {
  const { data, error } = await supabase
    .from("Messages")
    .select()
    .eq("room_id", room_id);
  if (error) {
    console.error(error);
  }
  Messages.set(data);
};

export const messagesSubscription = supabase
  .from("Messages")
  .on("*", (payload) => {
    // console.log("Change received!", payload);
    if (payload.eventType === "INSERT") {
      Messages.update((existing) => [...existing, payload.new]);
    }
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

  if (error) console.error(error);
  return {
    succeess: true,
  };
};
