import { createSlice } from "@reduxjs/toolkit";

export const loggingValidateSlice = createSlice({
  name: "loggingValidated",
  initialState: {
    value: false,
  },
  reducers: {
    loggingValidatedFalse: (state, action) => {
      state.value = false;
    },
    loggingValidatedTrue: (state, action) => {
      state.value = true;
    },
  },
});

export const { loggingValidatedFalse, loggingValidatedTrue } =
  loggingValidateSlice.actions;

export default loggingValidateSlice.reducer;
