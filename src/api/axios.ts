import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	withCredentials: true,
})

instance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		config.headers = config.headers || {}
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		const newAccessToken = response.headers['authorization']
		if (newAccessToken) {
			localStorage.setItem('accessToken', newAccessToken.split(' ')[1])
		}
		return response
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

export default instance
