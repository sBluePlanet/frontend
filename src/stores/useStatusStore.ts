import { create } from "zustand";

interface StatusState {
  userId: number | null;
  setUserId: (id: number) => void;

  air: number;
  water: number;
  life: number;
  support: number;
  prev: {
    air: number;
    water: number;
    life: number;
    support: number;
  };
  setStatus: (
    key: keyof Omit<StatusState, "setStatus" | "prev">,
    value: number
  ) => void;
  resetPrev: () => void;
  getDiff: () => { [key: string]: number };
}

export const useStatusStore = create<StatusState>((set, get) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),

  air: 50,
  water: 50,
  life: 50,
  support: 50,
  prev: {
    air: 50,
    water: 50,
    life: 50,
    support: 50,
  },
  setStatus: (key, value) =>
    set((state) => {
      const prevValue = state[key];
      return {
        ...state,
        prev: { ...state.prev, [key]: prevValue },
        [key]: value,
      };
    }),
  resetPrev: () =>
    set((state) => ({
      ...state,
      prev: {
        air: state.air,
        water: state.water,
        life: state.life,
        support: state.support,
      },
    })),
  getDiff: () => {
    const state = get();
    return {
      air: state.air - state.prev.air,
      water: state.water - state.prev.water,
      life: state.life - state.prev.life,
      support: state.support - state.prev.support,
    };
  },
}));
