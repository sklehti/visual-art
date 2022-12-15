import { createSlice } from "@reduxjs/toolkit";

const allImages6Slice = createSlice({
  name: "allImages6",
  initialState: 0,
  reducers: {
    mobileViewState(state, action) {
      console.log(state, "state");
      const view = action.payload;
      return view;
    },
  },
});

export const { mobileViewState } = allImages6Slice.actions;
export default allImages6Slice.reducer;
