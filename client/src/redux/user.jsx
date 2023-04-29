import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  pincode: "",
  date: "",
  timeId: "",
  items: [],
  time: "",
  addressId: "",
  type: ""
};

const userSlice = createSlice({
  name: "user_part",
  initialState: INITIAL_STATE,
  reducers: {
    updatePincode: (state, action) => {
      state.pincode = action.payload;
    },
    updateDate: (state, action) => {
        state.date = action.payload;
    },
    updateTimeId: (state, action) => {
        state.timeId = action.payload;
    },
    updateItems: (state, action) => {
        state.items = action.payload;
    },
    updateTime: (state, action) => {
        state.time = action.payload;
    },
    updateAddressId: (state, action) => {
      state.addressId = action.payload;
    },
    updateType: (state, action) => {
      state.type = action.payload;
    },
    
  },
});



export const { updatePincode, updateDate, updateTimeId, updateItems, updateTime, updateAddressId, updateType } = userSlice.actions;

export default userSlice.reducer;
