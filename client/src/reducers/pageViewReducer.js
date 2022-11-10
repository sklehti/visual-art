import { createSlice } from "@reduxjs/toolkit";

const pageViewSlice = createSlice({
  name: "pageView",
  initialState: [],
  reducers: {
    allImages(state, action) {
      const images = action.payload;
      return images;
    },
  },
});

export const { allImages } = pageViewSlice.actions;
export default pageViewSlice.reducer;
