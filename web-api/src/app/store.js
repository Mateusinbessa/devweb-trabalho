import userReducer from "src/reducers/user/userSlice"
import modelReducer from "src/reducers/model/modelSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        user: userReducer,
        model: modelReducer,
        //anotherReducer: counterAnotherReducer,
    }
})