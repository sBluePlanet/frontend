import { create } from "zustand";

interface StatusState {
  air: number;
  water: number;
  life: number;
  support: number;
  setStatus: (key: keyof StatusState, value: number) => void;
  resetStatus: () => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  air: 50,
  water: 50,
  life: 50,
  support: 50,
  setStatus: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetStatus: () => set({ air: 50, water: 50, life: 50, support: 50 }),
}));
