import api from '../api/axios'
import { setUser } from '../store/AuthSlice/AuthSlice'

interface IAuthorizationResponse {
	message: string
	access_token: string
	refresh_token: string
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
		password: string
		roleId: number
	}
}

interface ILoginCredentials {
	email: string
	password: string
}

interface IRegistrationCredentials {
	firstName: string
	lastName: string
	email: string
	password: string
}

export const registration = async (credentials: IRegistrationCredentials) => {
	const response = await api.post<IAuthorizationResponse>(
		'/registration',
		credentials
	)
	return response.data as IAuthorizationResponse
}

export const login = async (credentials: ILoginCredentials) => {
	const response = await api.post<IAuthorizationResponse>('/login', credentials)

	return response.data as IAuthorizationResponse
}

export const logout = () => {
	setUser(null)
	localStorage.removeItem('accessToken')
	document.cookie =
		'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
