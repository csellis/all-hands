import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Messages = writable([]);

export const loadMessages = async (channel_id) => {
  const { data, error } = await supabase.from("messages").select().eq("channel_id", channel_id);
  if (error) {
    console.error(error);
  }
  Messages.set(data);
};

export const messagesSubscription = supabase
  .from("messages")
  .on("*", (payload) => {
    // console.log("Change received!", payload);
    if (payload.eventType === "INSERT") {
      Messages.update((existing) => [...existing, payload.new]);
    }
  })
  .subscribe();

export const updateMessage = async (id, payload) => {
  const { data, error } = await supabase.from("messages").update(payload).match({ id });
  if (error) console.error(error);
};

export const insertMessage = async (channel_id, message) => {
  const user = supabase.auth.user();
  const user_id = user?.id;
  const payload = {
    channel_id,
    message,
    user_id,
  };
  const { data, error } = await supabase.from("messages").insert(payload);

  if (error) console.error(error);
  return {
    succeess: true,
  };
};
