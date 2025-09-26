
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from './feedSlice'
import refreshReducer from './refreshSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    refresh: refreshReducer,
  },
});

export default appStore;