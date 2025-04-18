import { create } from "zustand";

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: string;
  show: (x: number, y: number, content: string) => void;
  hide: () => void;
}

export const useTooltipStore = create<TooltipState>((set) => ({
  visible: false,
  x: 0,
  y: 0,
  content: "",
  show: (x, y, content) => set({ visible: true, x, y, content }),
  hide: () => set({ visible: false }),
}));
