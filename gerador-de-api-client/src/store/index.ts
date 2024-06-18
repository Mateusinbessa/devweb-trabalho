import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import counterSlice from './slices/counterSlice'
import projectsSlice from './slices/projectsSlice'
import modelsSlice from './slices/modelsSlice'
import editSlice from './slices/editSlice'

export const store = configureStore({
	reducer: {
		counterSlice,
		projectsSlice,
		modelsSlice,
		editSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
