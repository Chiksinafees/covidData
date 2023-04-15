import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact_arr: [],
};

const ContactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    contactHandler(currState, action) {
      console.log(action);

      currState.contact_arr = action.payload.newArr;
    },
  },
});

export const contactAction = ContactSlice.actions;

export default ContactSlice.reducer;
