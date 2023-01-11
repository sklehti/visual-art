import { createSlice } from "@reduxjs/toolkit";

const showroomSlice = createSlice({
  name: "showroom",
  initialState: {
    value: true,
  },
  reducers: {
    showroomFalse: (state, action) => {
      state.value = false;
    },
    showroomTrue: (state, action) => {
      state.value = true;
    },
  },
});

export const { showroomFalse, showroomTrue } = showroomSlice.actions;
export default showroomSlice.reducer;
