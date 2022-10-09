import { writable } from "svelte/store";

import { supabase } from "../services/supabase";

export const Rooms = writable([]);

export const loadRooms = async () => {
  const { data, error } = await supabase.from("Rooms").select();
  if (error) {
    console.error(error);
  }

  Rooms.set(data);
};
