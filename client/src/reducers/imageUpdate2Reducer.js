import { createSlice } from "@reduxjs/toolkit";

const imageUpdate2Slice = createSlice({
  name: "imageUpdate2",
  initialState: {
    name: "",
    image: "",
    text: "",
  },
  reducers: {
    imgData(state, action) {
      const img = action.payload;

      return img;
    },
  },
});

export const { imgData } = imageUpdate2Slice.actions;
export default imageUpdate2Slice.reducer;
