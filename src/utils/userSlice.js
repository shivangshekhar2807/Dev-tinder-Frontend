import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {},
  reducers: {
    addUser(state,action) {
        return action.payload
      
    },
      removeUser(state,action) {
        return null
    }
  },
});

export const UserSliceAction=UserSlice.actions

export default UserSlice;