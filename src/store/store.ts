import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import registrationsReducer from "./registrationsSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
