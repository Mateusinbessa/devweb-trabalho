import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}
/*
@Description:
    Just a simple example of the usage of redux toolkit to build a redux for the users of the appliaction.
    It have to be implemented, this is not functional, the redux is being called in the login page, to save
    the informations of the form. It's just getting the information from there, and saving. You have to implement it,
    to be functional with API requests.
*/
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        save: (state, action) => {
            state.user = action.payload
            //@Description: This method will hit an API saving a user, get the data from response, and save.
        },
        read: (state, action) => {
            state.user = action.payload
            //@Description: This method will hit an API, get the data from response, and save in redux
        },
        readAll: (state, action) => {
            //@Description: This method will hit an API, get all users, and save in the redux.
        }
    }
})

export const { save, read } = userSlice.actions
export default userSlice.reducer