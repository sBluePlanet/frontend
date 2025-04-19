import { create } from "zustand";
import { getNewsList } from "../api/dataApi";

interface News {
  specialEventId: number;
  title: string;
}

interface NewsStore {
  newsList: News[];
  getList: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
  newsList: [],
  getList: async () => {
    const list = await getNewsList();
    set({ newsList: list });
  },
}));