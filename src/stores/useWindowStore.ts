import { create } from "zustand";

interface WindowData {
  type: string;
  title: string;
  content: React.ReactNode;
  key?: string;
  color?: string;
}

export const useWindowStore = create<{
  openWindowQueue: WindowData[];
  pushWindow: (data: WindowData) => void;
  clearWindowQueue: () => void;

  closeWindowQueue: string[];
  requestCloseWindow: (key: string) => void;
  clearCloseQueue: () => void;
}>((set) => ({
  openWindowQueue: [],
  pushWindow: (data) =>
    set((state) => ({ openWindowQueue: [...state.openWindowQueue, data] })),
  clearWindowQueue: () => set({ openWindowQueue: [] }),

  closeWindowQueue: [],
  requestCloseWindow: (key: string) =>
    set((state) => ({
      closeWindowQueue: [...state.closeWindowQueue, key],
    })),
  clearCloseQueue: () => set({ closeWindowQueue: [] }),
}));
