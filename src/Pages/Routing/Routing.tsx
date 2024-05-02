import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../HomePage/HomePage'
import LoginPage from '../LoginPage/LoginPage'
import RegitrationPage from '../RegistrationPage/RegistrationPage'

export const Routing: FC = () => {
	return (
		<Routes>
			<Route index path='/' element={<HomePage />} />
			{/* <Route path='/' element={<Navigate to='/home' />} /> */}

			<Route path='/login' element={<LoginPage />} />
			<Route path='/registration' element={<RegitrationPage />} />
		</Routes>
	)
}
