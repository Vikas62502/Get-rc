import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./exampleSlice"; // Replace with your slice reducer

const store = configureStore({
  reducer: {
    example: exampleReducer, // Add your reducers here
  },
});

export default store;
