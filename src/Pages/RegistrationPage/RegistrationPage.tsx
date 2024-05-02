import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { registration } from '../../services/AuthService'
import {
	setError,
	setIsFetching,
	setUser,
} from '../../store/AuthSlice/AuthSlice'
import { setTokens } from '../../utils/utils'

interface RegistrationFormData {
	firstName: string
	lastName: string
	email: string
	password: string
}

const RegistrationForm: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [formData, setFormData] = useState<RegistrationFormData>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			dispatch(setIsFetching(true))
			const response = await registration(formData)
			const { access_token, refresh_token, user } = response
			setTokens(access_token, refresh_token)
			dispatch(setUser(user))

			dispatch(setIsFetching(false))
			navigate('/')
		} catch (error: unknown) {
			if (error instanceof Error) {
				dispatch(setError(error.message))
			}
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='firstName'
				value={formData.firstName}
				onChange={handleChange}
				placeholder='Имя'
			/>
			<input
				type='text'
				name='lastName'
				value={formData.lastName}
				onChange={handleChange}
				placeholder='Фамилия'
			/>
			<input
				type='email'
				name='email'
				value={formData.email}
				onChange={handleChange}
				placeholder='Email'
			/>
			<input
				type='password'
				name='password'
				value={formData.password}
				onChange={handleChange}
				placeholder='Пароль'
			/>
			<button type='submit'>Зарегистрироваться</button>
		</form>
	)
}

export default RegistrationForm
