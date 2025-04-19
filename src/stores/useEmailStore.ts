import { create } from "zustand";
import { getEmailList } from "../api/dataApi";

interface Email {
  eventId: number;
  title: string;
}

interface EmailStore {
  emailList: Email[];
  getList: () => Promise<void>;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emailList: [],
  getList: async () => {
    const list = await getEmailList();
    set({ emailList: list });
  },
}));
