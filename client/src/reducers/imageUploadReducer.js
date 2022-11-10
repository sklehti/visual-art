import { createSlice } from "@reduxjs/toolkit";

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState: null,
  reducers: {
    invaledImageUpload(state, action) {
      const invaledImage = action.payload;
      return invaledImage;
    },
  },
});

export const { invaledImageUpload } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
