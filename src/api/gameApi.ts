import axiosInstance from "./axiosInstance";
import { useStatusStore } from "../stores/useStatusStore";
import { useEventStore } from "../stores/useEventStore";

export const getStartData = async () => {
  const response = await axiosInstance.get("/game/start");
  return response.data;
};

export const getEndingData = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get(`/game/ending`, {
    params: { userId },
  });
  return response.data;
};

export const getCommonEvent = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get("/game/common", {
    params: { userId },
  });
  const { event } = response.data;
  useEventStore.getState().setEventId(event.eventId);
  return response.data;
};

export const getSpecialEvent = async () => {
  const userId = useStatusStore.getState().userId;
  const response = await axiosInstance.get("/game/special", {
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

  console.log("postChoice:nextEvent: ", response.data.nextEvent);
  console.log("userStatus:", response.data.userStatus);
  return response.data;
};
