import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Model {
	name: string
	file: string
	route: string
}

interface ModelState {
	models: Model[]
}

const initialState: ModelState = {
	models: [],
}

export const modelsSlice = createSlice({
	name: 'modelsSlice',
	initialState,
	reducers: {
		start: (state, action: PayloadAction<Model[]>) => {
			state.models = action.payload
		},
		add: (state, action: PayloadAction<Model>) => {
			state.models.push({
				...action.payload,
				route: '/' + action.payload.name,
				file: '_' + action.payload.file + '.js',
			})
		},
		edit: (
			state,
			action: PayloadAction<{
				oldRoute: string
				newRoute: string
			}>,
		) => {
			const index = state.models.findIndex(
				(model) => model.route === action.payload.oldRoute,
			)
			console.log(index, action.payload)

			state.models[index].route = action.payload.newRoute
		},
	},
})

export const { start, add, edit } = modelsSlice.actions

export default modelsSlice.reducer
