import { derived, writable } from "svelte/store";

import { supabase } from "../services/supabase";
import { Settings } from "./settings";

export const Rooms = writable([]);

export const loadRooms = async () => {
  const { data, error } = await supabase.from("rooms").select();
  if (error) {
    console.error(error);
  }
  Rooms.set(data);
};

export const currentRoom = derived([Rooms, Settings], ([$Rooms, $Settings]) => {
  // console.log({ rooms: $Rooms, settings: $Settings });
  if ($Settings && $Rooms && $Rooms.length > 0 && $Settings.length > 0) {
    return $Rooms.find((room) => room.id === $Settings[0].current_room);
  } else {
    return null;
  }
});
