import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface IAddNewVacationCredentials {
	title: string
	description: string
	startDate: string
	endDate: string
	price: string
	image: string
}

export const addNewVacation = createAsyncThunk<
	void,
	IAddNewVacationCredentials
>('user/newVacations', async (credentials, { rejectWithValue }) => {
	try {
		const response = await api.post<void>('/vacations/new', credentials)
		return response.data
	} catch (err) {
		return rejectWithValue(err.response.data)
	}
})
