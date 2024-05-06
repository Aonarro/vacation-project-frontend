import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import { warningLogoutNotify } from '../../services/NotifyService'
import { logout } from '../../store/AuthSlice/AuthSlice'
import { removeTokens } from '../../utils/utils'
import s from './Header.module.scss'

export const Header: FC = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.auth.user)
	const navigate = useNavigate()

	const logoutUser = () => {
		dispatch(logout())
		removeTokens()
		warningLogoutNotify('See you next time ')
	}
	const onClickLogoHandler = () => {
		user ? navigate('/vacations') : navigate('/')
	}

	return (
		<header
			className={
				user ? `${s.headerContainer}` : `${s.headerContainer} ${s.unAuth}`
			}
		>
			<div className={s.logo} onClick={onClickLogoHandler}>
				Vacations
			</div>
			<div>
				{user ? (
					<div className={s.rightMenu}>
						<span>
							Welcome
							<span className={s.userName}>
								{user.firstName} {user.lastName}
							</span>
						</span>

						<Link to='/' className={s.logout} onClick={logoutUser}>
							<span>Logout</span>
						</Link>
					</div>
				) : (
					<></>
				)}
			</div>
		</header>
	)
}
