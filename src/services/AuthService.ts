import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface IAuthorizationResponse {
	message: string
	access_token: string
	refresh_token: string
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
		roleId: number
	}
}

interface IAutoLoginResponse {
	message: string
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
		roleId: number
	}
}

interface ILoginCredentials {
	email: string
	password: string
}

interface IAutoLoginCredentials {
	email: string
}

interface IRegistrationCredentials {
	firstName: string
	lastName: string
	email: string
	password: string
}

export const registration = createAsyncThunk<
	IAuthorizationResponse,
	IRegistrationCredentials
>('user/registration', async credentials => {
	const response = await api.post<IAuthorizationResponse>(
		'/registration',
		credentials
	)
	return response.data
})

export const login = createAsyncThunk<
	IAuthorizationResponse,
	ILoginCredentials
>('user/login', async credentials => {
	const response = await api.post<IAuthorizationResponse>('/login', credentials)
	return response.data
})

export const autoLogin = createAsyncThunk<IAutoLoginResponse>(
	'user/auto-login',
	async () => {
		const response = await api.get<IAutoLoginResponse>('/auto-login')
		return response.data
	}
)
