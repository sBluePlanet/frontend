import axiosInstance from "./axiosInstance";
import { useStatusStore } from "../stores/useStatusStore";

export const getStartData = async () => {
  const response = await axiosInstance.get("/game/start");
  return response.data;
};

export const getCommonEvent = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get("/game/common", {
    params: { userId },
  });
  return response.data;
};

export const postChoice = async (choiceId: number) => {
  const userStatusId = useStatusStore.getState().userId;
  const response = await axiosInstance.post("/game/choice", {
    userStatusId,
    choiceId,
  });
  return response.data;
};