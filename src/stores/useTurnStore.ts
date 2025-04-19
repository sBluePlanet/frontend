import { create } from "zustand";

interface TurnState {
  turn: number;
  decreaseTurn: () => void;
  resetTurn: () => void;
}

export const useTurnStore = create<TurnState>((set) => ({
  turn: 20,
  decreaseTurn: () => set((state) => ({ turn: state.turn - 1 })),
  resetTurn: () => set({ turn: 20 }),
}));
