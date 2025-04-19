import axiosInstance from "./axiosInstance";
import { useStatusStore } from "../stores/useStatusStore";

export const getTooltips = async () => {
  const response = await axiosInstance.get("/data/tooltips");
  return response.data;
};

export const getEmailList = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get("/data/emailList", {
    params: { userId },
  });
  console.log(response.data);
  return response.data;
};

export const getEmailDetail = async (eventId: number) => {
  const userId = useStatusStore.getState().userId;
  console.log(eventId);
  const response = await axiosInstance.get("/data/emailDetail", {
    params: { userId, eventId },
  });
  return response.data;
};

export const getNewsList = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get("/data/newsList", {
    params: { userId },
  });
  return response.data;
};

export const getNewsDetail = async (specialEventId: number) => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get("/data/newsDetail", {
    params: { userId, specialEventId },
  });
  return response.data;
};
