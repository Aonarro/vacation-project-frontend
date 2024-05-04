import { FC } from 'react'
import { Header } from '../../components/Header/Header'
import useVerifyLoggedIn from '../../hooks/useVerifyLoggedIn'
import { Routing } from '../Routing/Routing'

export const Layout: FC = () => {
	const user = useVerifyLoggedIn()
	console.log(user)
	return (
		<div>
			<Header />
			<main>
				<Routing />
			</main>
		</div>
	)
}
