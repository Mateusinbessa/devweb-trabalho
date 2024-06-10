import userReducer from "src/reducers/user/userSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        user: userReducer,
        //anotherReducer: counterAnotherReducer,
    }
})