import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/user/userSlice'

export const store  = configureStore({
    reducer:userReducer,
})