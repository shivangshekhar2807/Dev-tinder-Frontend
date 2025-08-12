import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";

const appStore = configureStore({
    reducer:{User:UserSlice.reducer}
})

export default appStore;