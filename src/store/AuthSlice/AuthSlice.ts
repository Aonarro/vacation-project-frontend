import { createSlice } from '@reduxjs/toolkit'
import { autoLogin, login, registration } from '../../services/AuthService'
import { removeTokens, setTokens } from '../../utils/utils'

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
		logout: state => {
			state.user = null
			state.error = null
			removeTokens()
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registration.pending, state => {
				state.isFetching = true
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.isFetching = false
				state.user = action.payload.user
				setTokens(action.payload.access_token, action.payload.refresh_token)
				state.error = null
			})
			.addCase(registration.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.error.message ?? 'Registration failed'
			})
			.addCase(login.pending, state => {
				state.isFetching = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isFetching = false
				state.user = action.payload.user
				setTokens(action.payload.access_token, action.payload.refresh_token)
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.error.message ?? 'Login failed'
			})
			.addCase(autoLogin.pending, state => {
				state.isFetching = true
			})
			.addCase(autoLogin.fulfilled, (state, action) => {
				state.isFetching = false
				state.user = action.payload.user
				state.error = null
			})
			.addCase(autoLogin.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.error.message ?? 'Login failed'
			})
	},
})

export const { logout } = userSlice.actions

export default userSlice.reducer
