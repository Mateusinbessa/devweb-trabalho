import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    model: null,
    models: null,
}

export const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        save: (state, action) => {
            state.model = action.payload
        },
        read: (state, action) => {
            state.model = action.payload
        },
        readAll: (state, action) => {
            state.models = action.payload
        }
    }
})

export const { save, read, readAll } = modelSlice.actions
export default modelSlice.reducer