import { createSlice } from "@reduxjs/toolkit";

const imageUpload2Slice = createSlice({
  name: "imageUpload2",
  initialState: null,
  reducers: {
    valedUpload(state, action) {
      const valedUpload = action.payload;
      return valedUpload;
    },
  },
});

export const { valedUpload } = imageUpload2Slice.actions;
export default imageUpload2Slice.reducer;
