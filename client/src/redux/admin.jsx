import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  status: false,
  recycleId: "",
  itemId: "",
};

const adminSlice = createSlice({
  name: "admin_part",
  initialState: INITIAL_STATE,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateRecycleId: (state, action) => {
      state.recycleId = action.payload;
    },
    updateItemId: (state, action) => {
      state.itemId = action.payload;
    },
  },
});

export const { updateStatus, updateRecycleId, updateItemId } = adminSlice.actions;

export default adminSlice.reducer;
