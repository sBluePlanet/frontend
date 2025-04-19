import { create } from "zustand";

interface WindowData {
  type: string;
  title: string;
  content: React.ReactNode;
  key?: string;
  color?: string;
  width?: number;
  closable?: boolean;
  x?: number;
  y?: number;
}

export const useWindowStore = create<{
  openWindowQueue: WindowData[];
  pushWindow: (data: WindowData) => void;
  clearWindowQueue: () => void;

  closeWindowQueue: string[];
  requestCloseWindow: (key: string) => void;
  clearCloseQueue: () => void;

  currentZIndex: number;
  nextZIndex: () => number;
}>((set, get) => ({
  openWindowQueue: [],
  pushWindow: (data) =>
    set((state) => ({
      openWindowQueue: [...state.openWindowQueue, data],
    })),
  clearWindowQueue: () => set({ openWindowQueue: [] }),

  closeWindowQueue: [],
  requestCloseWindow: (key) =>
    set((state) => ({
      closeWindowQueue: [...state.closeWindowQueue, key],
    })),
  clearCloseQueue: () => set({ closeWindowQueue: [] }),

  currentZIndex: 10,
  nextZIndex: () => {
    const next = get().currentZIndex + 1;
    set({ currentZIndex: next });
    return next;
  },
}));
