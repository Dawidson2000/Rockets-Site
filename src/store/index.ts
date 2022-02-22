import { configureStore } from "@reduxjs/toolkit";

import spacecraftsSlice from "./spacecrafts-slice";

const store = configureStore({
  reducer: {
    spacecrafts: spacecraftsSlice.reducer
  }
});

export default store;