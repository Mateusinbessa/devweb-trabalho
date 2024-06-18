import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProjectsState {
	projects: string[]
}

const initialState: ProjectsState = {
	projects: [],
}

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		start: (state, action: PayloadAction<string[]>) => {
			state.projects = action.payload
		},
		add: (state, action: PayloadAction<string>) => {
			state.projects.push(action.payload)
		},
	},
})

export const { start, add } = projectsSlice.actions

export default projectsSlice.reducer
