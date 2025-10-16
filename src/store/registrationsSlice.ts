import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RegistrationsState, Registration } from "@/lib/interfaces";
import type { AppDispatch } from "@/store/store";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";

const initialState: RegistrationsState = {
  registrations: [],
};

const LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEYS.USER_REGISTRATIONS;

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    addRegistration(state, action: PayloadAction<Registration>) {
      state.registrations.push(action.payload);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(state.registrations)
      );
    },
    setRegistrations(state, action: PayloadAction<Registration[]>) {
      state.registrations = action.payload;
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(state.registrations)
      );
    },
  },
});

export const { addRegistration, setRegistrations } = registrationsSlice.actions;

export const initializeRegistrations = () => (dispatch: AppDispatch) => {
  const storedRegistrations = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedRegistrations) {
    dispatch(setRegistrations(JSON.parse(storedRegistrations)));
  }
};

export default registrationsSlice.reducer;
