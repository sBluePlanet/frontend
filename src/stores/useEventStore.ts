import { create } from "zustand";

interface EventState {
  nextEvent: number | null;
  eventId: number | null;
  setNextEvent: (value: number) => void;
  setEventId: (id: number) => void;
}

export const useEventStore = create<EventState>((set) => ({
  nextEvent: null,
  eventId: null,
  setNextEvent: (value) => set({ nextEvent: value }),
  setEventId: (id) => set({ eventId: id }),
}));
