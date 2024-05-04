import { FC, useState } from 'react'
import HomePageBg from '../../assets/HomePageBackground.jpg'
import LoginForm from '../../components/Login/Login'
import RegistrationForm from '../../components/Registration/Registration'
import s from './HomePage.module.scss'

export const HomePage: FC = () => {
	const [authType, setAuthType] = useState('login')

	return (
		<div className={s.homepage}>
			<div className={s.imageContainer}>
				<img src={HomePageBg} alt='Description' />
			</div>
			<div className={s.content}>
				<h1>Welcome to my vacation app!</h1>
				<div className={s.buttons}>
					<button
						className={`${s.auth_type_btn} ${
							authType === 'login' ? s.active : ''
						}`}
						onClick={() => setAuthType('login')}
					>
						Login
					</button>
					<button
						onClick={() => setAuthType('registration')}
						className={`${s.auth_type_btn} ${
							authType === 'registration' ? s.active : ''
						}`}
					>
						Registration
					</button>
				</div>
				{authType === 'login' ? <LoginForm /> : <RegistrationForm />}
			</div>
		</div>
	)
}
