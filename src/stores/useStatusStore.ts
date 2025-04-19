import { create } from "zustand";

interface StatusState {
  userId: number | null;
  setUserId: (id: number) => void;

  air: number;
  water: number;
  life: number;
  support: number;
  setStatus: (type: string, value: number) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  air: 50,
  water: 50,
  life: 50,
  support: 50,
  setStatus: (type, value) =>
    set((state) => ({
      ...state,
      [type]: value,
    })),
}));
