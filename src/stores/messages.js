import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Messages = writable([]);

const STANDARD_MESSAGE_FETCH = `
id,
message, 
inserted_at, 
channel_id,
users: user_id (
  id,
  username
)
`;

export const fetchMessage = async (id) => {
  const { data, error } = await supabase.from("messages").select(STANDARD_MESSAGE_FETCH).eq("id", id).single();

  if (error) {
    console.log("error", error);
  } else {
    return data;
  }
};

export const loadMessages = async (channel_id) => {
  const { data, error } = await supabase.from("messages").select(STANDARD_MESSAGE_FETCH).eq("channel_id", channel_id).order("inserted_at", { ascending: true });
  if (error) {
    console.error(error);
  }
  Messages.set(data);
};

export const messagesSubscription = supabase
  .from("messages")
  .on("*", async (payload) => {
    console.log("Change received!", payload);
    if (payload.eventType === "INSERT") {
      let message = await fetchMessage(payload.new.id);
      Messages.update((existing) => [...existing, message]);
    }
  })
  .subscribe();

export const updateMessage = async (id, payload) => {
  const { data, error } = await supabase.from("messages").update(payload).match({ id });
  if (error) console.error(error);
};

export const deleteMessage = async (id) => {
  const { data, error } = await supabase.from("messages").delete().eq("id", id);
  if (error) console.error(error);
  if (data) {
    Messages.update((existing) => existing.filter((message) => message.id !== id));
  }
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
