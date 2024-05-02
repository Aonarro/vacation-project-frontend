import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { registration } from '../../services/AuthService'
import {
	setError,
	setIsFetching,
	setUser,
} from '../../store/AuthSlice/AuthSlice'
import { setTokens } from '../../utils/utils'

interface IRegistrationFormValues {
	firstName: string
	lastName: string
	email: string
	password: string
}

const RegistrationForm: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegistrationFormValues>()

	const onSubmit = async (formData: IRegistrationFormValues) => {
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type='text'
				{...register('firstName', { required: 'firstName is required' })}
				placeholder='firstName'
			/>
			<input
				type='text'
				{...register('lastName', { required: 'lastName is required' })}
				placeholder='lastName'
			/>
			<input
				type='email'
				{...register('email', { required: 'Email is required' })}
				placeholder='email'
			/>
			<input
				type='password'
				{...register('password', { required: 'Password is required' })}
				placeholder='password'
			/>
			<button type='submit'>Зарегистрироваться</button>
		</form>
	)
}

export default RegistrationForm
