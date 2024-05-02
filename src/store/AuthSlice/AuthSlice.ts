import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Store'

interface UserState {
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
	} | null
	error: string | null
	isFetching: boolean
}

const initialState: UserState = {
	user: null,
	error: null,
	isFetching: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState['user']>) => {
			state.user = action.payload
		},
		setError: (state, action: PayloadAction<UserState['error']>) => {
			state.error = action.payload
		},
		setIsFetching: (state, action: PayloadAction<UserState['isFetching']>) => {
			state.isFetching = action.payload
		},
	},
})

export const { setUser, setError, setIsFetching } = userSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default userSlice.reducer
