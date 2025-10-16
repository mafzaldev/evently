import type { Event, Registration } from "@/lib/interfaces";

const mockEvents: Event[] = [
  {
    id: "1",
    name: "React Conference",
    date: "2025-11-01",
    location: "New York",
  },
  {
    id: "2",
    name: "TypeScript Summit",
    date: "2025-12-05",
    location: "San Francisco",
  },
  { id: "3", name: "Frontend Fest", date: "2026-01-20", location: "Chicago" },
];

export const fetchEvents = async (): Promise<Event[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return mockEvents;
};

export const registerForEvent = async (
  registration: Registration
): Promise<{ success: boolean }> => {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true };
};
