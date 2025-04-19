import { create } from "zustand";
import { getEmailList } from "../api/dataApi";

interface Email {
  id: number;
  title: string;
}

interface EmailStore {
  emailList: Email[];
  emailQuota: number;
  getList: () => Promise<void>;
  decreaseQuota: () => void;
}

export const useEmailStore = create<EmailStore>((set, get) => ({
  emailList: [],
  emailQuota: 3,
  getList: async () => {
    const list = await getEmailList();
    set({ emailList: list });
  },
  decreaseQuota: () => {
    const current = get().emailQuota;
    if (current > 0) set({ emailQuota: current - 1 });
  },
}));
