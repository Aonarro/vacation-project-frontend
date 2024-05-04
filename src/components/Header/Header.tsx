import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import { logout } from '../../store/AuthSlice/AuthSlice'
import { removeTokens } from '../../utils/utils'
import styles from './Header.module.scss'

export const Header: FC = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.auth.user)

	const logoutUser = () => {
		dispatch(logout())
		removeTokens()
	}

	return (
		<header className={styles.headerContainer}>
			<div>Vacations</div>
			<div>
				{user ? (
					<div className={styles.onAir}>
						<span>
							Welcome
							<span className={styles.userName}>
								{user.firstName} {user.lastName}
							</span>
						</span>
						<Link to='/' className={styles.logout} onClick={logoutUser}>
							Logout
						</Link>
					</div>
				) : (
					<div className={styles.onAir}>
						<span className={styles.noConnect}>You are on the floor 🛬</span>
						<span className={styles.logout}>already logout</span>
					</div>
				)}
			</div>
		</header>
	)
}
