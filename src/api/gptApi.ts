import axiosInstance from "./axiosInstance";
import { useStatusStore } from "../stores/useStatusStore";

export const getAdvice = async (
  eventId: number,
  title: string,
  content: string
) => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get(`/gpt/advice`, {
    params: { userId, eventId, title, content },
  });
  return response.data;
};

export const getSummary = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get(`/gpt/summary`, {
    params: { userId },
  });
  return response.data;
};
