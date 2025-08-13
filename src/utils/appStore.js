import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import feedSlice from "./feedSlice";

const appStore = configureStore({
    reducer:{User:UserSlice.reducer,Feed:feedSlice.reducer}
})

export default appStore;