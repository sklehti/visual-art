import { createSlice } from "@reduxjs/toolkit";

const imageUpdateSlice = createSlice({
  name: "imageUpdate",
  initialState: {
    imgAdded: false,
    modalOpen: false,
  },
  reducers: {
    addImageTrue(state, action) {
      state = {
        imgAdded: true,
      };
      return state;
    },
    addImageFalse(state, action) {
      state = {
        imgAdded: false,
      };
      return state;
    },
    showModalTrue(state, action) {
      state = {
        modalOpen: true,
      };
      return state;
    },
    showModalFalse(state, action) {
      state = {
        modalOpen: false,
      };
      return state;
    },
  },
});

export const { addImageTrue, addImageFalse, showModalFalse, showModalTrue } =
  imageUpdateSlice.actions;
export default imageUpdateSlice.reducer;
