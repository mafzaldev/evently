import type { Event, Registration } from "@/lib/interfaces";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get(`${backendUrl}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const registerForEvent = async (
  _: Registration
): Promise<{ success: boolean }> => {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true };
};
