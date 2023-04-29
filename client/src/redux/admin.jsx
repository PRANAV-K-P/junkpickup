import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    status: false,
  };
  

  const adminSlice = createSlice({
    name: "admin_part",
    initialState: INITIAL_STATE,
    reducers: {
      updateStatus: (state, action) => {
        state.status = action.payload;
      }, 
    },
  });

  export const { updateStatus } = adminSlice.actions;

export default adminSlice.reducer;