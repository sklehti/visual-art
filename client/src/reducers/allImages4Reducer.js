import { createSlice } from "@reduxjs/toolkit";

const allImages4Slice = createSlice({
  name: "allImages4",
  initialState: [],
  reducers: {
    imgArray3(state, action) {
      const images = action.payload;
      return images;
    },
  },
});

export const { imgArray3 } = allImages4Slice.actions;
export default allImages4Slice.reducer;
