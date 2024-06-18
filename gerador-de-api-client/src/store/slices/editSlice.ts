import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Model {
	name: string
	file: string
	route: string
}

export interface ModelState {
	models: Model
}

const initialState: ModelState = {
	models: { name: '', file: '', route: '' },
}

export const editSlice = createSlice({
	name: 'editSlice',
	initialState,
	reducers: {
		start: (state, action: PayloadAction<Model>) => {
			state.models = action.payload
		},
		remove: (state) => {
			state.models = initialState.models
		},
	},
})

export const { start, remove } = editSlice.actions

export default editSlice.reducer
