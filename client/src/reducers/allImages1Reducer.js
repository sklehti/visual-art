import { createSlice } from "@reduxjs/toolkit";

const allImages1Slice = createSlice({
  name: "allImages1",
  initialState: [],
  reducers: {
    imgByYear(state, action) {
      const images = action.payload;
      return images;
    },
  },
});

export const { imgByYear } = allImages1Slice.actions;
export default allImages1Slice.reducer;
