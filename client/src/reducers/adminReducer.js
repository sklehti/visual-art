import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    value: true,
  },
  reducers: {
    rightAdminUser(state, action) {
      const adminUser = action.payload;
      return adminUser;
    },
  },
});

export const { rightAdminUser } = adminSlice.actions;
export default adminSlice.reducer;
