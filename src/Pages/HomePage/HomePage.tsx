import { FC, useEffect } from 'react'
import api from '../../api/axios'

export const HomePage: FC = () => {
	async function ProtectedFunc() {
		const response = await api.get('protected')
	}
	useEffect(() => {
		ProtectedFunc()
	}, [])

	return <div>Home!!!</div>
}
