import { create } from "zustand";

interface EventState {
  nextEvent: number | null;
  setNextEvent: (value: number) => void;
}

export const useEventStore = create<EventState>((set) => ({
  nextEvent: null,
  setNextEvent: (value) => set({ nextEvent: value }),
}));
