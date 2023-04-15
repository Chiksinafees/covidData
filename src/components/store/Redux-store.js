import { configureStore } from "@reduxjs/toolkit";
import ContactReducer from "./Contact-store";
import DetailReducer from "./Detail-store";
const store = configureStore({
  reducer: {
    allContact: ContactReducer,
    detailing: DetailReducer,
  },
});

export default store;
