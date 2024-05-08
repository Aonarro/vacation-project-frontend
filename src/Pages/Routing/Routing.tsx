import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddVacationPage } from '../AddVacationPage/AddVacationPage'
import { HomePage } from '../HomePage/HomePage'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage'
import { VacationsPage } from '../Vacations/VacationsPage'

export const Routing: FC = () => {
	return (
		<Routes>
			<Route index path='/' element={<HomePage />} />
			<Route path='/vacations' element={<VacationsPage />} />
			<Route path='/vacation/new' element={<AddVacationPage />} />

			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}
