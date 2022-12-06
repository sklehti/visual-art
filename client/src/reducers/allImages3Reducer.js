import { createSlice } from "@reduxjs/toolkit";

const allImages3Slice = createSlice({
  name: "allImages3",
  initialState: [],
  reducers: {
    imgArray2(state, action) {
      const images = action.payload;
      return images;
    },
  },
});

export const { imgArray2 } = allImages3Slice.actions;
export default allImages3Slice.reducer;
