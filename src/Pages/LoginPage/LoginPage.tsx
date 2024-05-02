import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { login } from '../../services/AuthService'
import {
	setError,
	setIsFetching,
	setUser,
} from '../../store/AuthSlice/AuthSlice'
import { setTokens } from '../../utils/utils'

interface ILoginFormValues {
	email: string
	password: string
}

const LoginForm: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormValues>()

	const onSubmit = async (formData: ILoginFormValues) => {
		try {
			dispatch(setIsFetching(true))
			const response = await login(formData)
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
				type='email'
				{...register('email', { required: 'Email is required' })}
				placeholder='Email'
			/>
			{errors.email && <span>{errors.email.message}</span>}

			<input
				type='password'
				{...register('password', { required: 'Password is required' })}
				placeholder='Пароль'
			/>
			{errors.password && <span>{errors.password.message}</span>}

			<button type='submit'>Войти</button>
		</form>
	)
}

export default LoginForm
