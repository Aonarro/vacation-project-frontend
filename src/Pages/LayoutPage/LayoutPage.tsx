import { FC } from 'react'
import { Routing } from '../Routing/Routing'

export const Layout: FC = () => {
	return (
		<div>
			{'Header'}
			<main>
				<Routing />
			</main>
		</div>
	)
}
