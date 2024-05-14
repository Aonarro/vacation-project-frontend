import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface IAddNewVacationCredentials {
	title: string
	description: string
	startDate: string
	endDate: string
	price: number
	file: File
}

export const addNewVacation = createAsyncThunk<
	void,
	IAddNewVacationCredentials & { file: File[] }
>(
	'user/newVacations',
	async ({ file, ...credentials }, { rejectWithValue }) => {
		try {
			const formData = new FormData()

			Object.entries(credentials).forEach(([key, value]) => {
				formData.append(key, value)
			})

			console.log(file)

			formData.append('file', file[0])

			const response = await api.post<void>('/vacations/new', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			console.log('addNewService')
			return response.data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)
