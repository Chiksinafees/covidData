import { createSlice } from "@reduxjs/toolkit";

const initialStore = {
  fullDetail: {},
};

const detailSlice = createSlice({
  name: "detail",
  initialState: initialStore,
  reducers: {
    detailHandler(currState, action) {
      console.log(action);
      currState.fullDetail = action.payload;
    },
  },
});

export const detailActions = detailSlice.actions;
export default detailSlice.reducer;
