import { createSlice } from "@reduxjs/toolkit";

const allImages5Slice = createSlice({
  name: "allImages5",
  initialState: true,
  reducers: {
    firstTimeOnPage(state, action) {
      const images = action.payload;
      return images;
    },
  },
});

export const { firstTimeOnPage } = allImages5Slice.actions;
export default allImages5Slice.reducer;
