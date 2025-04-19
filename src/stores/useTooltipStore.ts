import { create } from "zustand";

interface TooltipData {
  [keyword: string]: string;
}

interface TooltipStore {
  visible: boolean;
  x: number;
  y: number;
  content: string;
  tooltipData: TooltipData;
  show: (x: number, y: number, content: string) => void;
  hide: () => void;
  setTooltipData: (data: TooltipData) => void;
}

export const useTooltipStore = create<TooltipStore>((set) => ({
  visible: false,
  x: 0,
  y: 0,
  content: "",
  tooltipData: {},
  show: (x, y, content) => set({ visible: true, x, y, content }),
  hide: () => set({ visible: false }),
  setTooltipData: (data) => {
    const map: TooltipData = {};
    if (Array.isArray(data)) {
      data.forEach(({ keyword, content }) => {
        map[keyword] = content;
      });
    }
    set({ tooltipData: map });
  },
}));
