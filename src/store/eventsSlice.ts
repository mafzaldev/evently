import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "@/lib/interfaces";
import type { AppDispatch } from "@/store/store";
import { fetchEvents } from "@/api/mockApi";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

const LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEYS.EVENTS_ORDER;

export interface EventsState {
  events: Event[];
  order: string[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  order: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    setOrder(state, action: PayloadAction<string[]>) {
      state.order = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.order));
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setEvents, setOrder, setLoading, setError } =
  eventsSlice.actions;
export default eventsSlice.reducer;

export const initializeEvents = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedOrder) {
    dispatch(setOrder(JSON.parse(savedOrder)));
  }
  try {
    const events = await fetchEvents();
    dispatch(setEvents(events));
    if (!savedOrder) {
      dispatch(setOrder(events.map((e: Event) => e.id)));
    }
  } catch (error) {
    dispatch(setError("Failed to fetch events"));
  } finally {
    dispatch(setLoading(false));
  }
};
