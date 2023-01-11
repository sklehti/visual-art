import { createSlice } from "@reduxjs/toolkit";

const allImages2Slice = createSlice({
  name: "allImages2",
  initialState: [],
  reducers: {
    imgArray1(state, action) {
      const images = action.payload;
      return images;
    },
  },
});

export const { imgArray1 } = allImages2Slice.actions;
export default allImages2Slice.reducer;
