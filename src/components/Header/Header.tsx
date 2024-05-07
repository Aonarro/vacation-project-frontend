import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoutIcon from '../../assets/icons/logOutIcon.svg'
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
	const [btn, setBtn] = useState<string | null>()
	const isAdmin = false

	const logoutUser = () => {
		dispatch(logout())
		removeTokens()
		warningLogoutNotify('See you next time ')
	}
	const onClickLogoHandler = () => {
		user ? navigate('/vacations') : navigate('/')
	}

	const onClickAdminButtonHandler = (e: MouseEvent) => {
		const btnName = (e.target as HTMLAnchorElement).getAttribute(
			'data-button-name'
		)

		setBtn(btnName)
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

			<div className={s.rightMenuWrapper}>
				{isAdmin && (
					<div className={s.adminBtns}>
						<div
							className={
								btn === 'add-vacation'
									? `${s.linkWrapper} ${s.active}`
									: `${s.linkWrapper}`
							}
						>
							<Link
								data-button-name='add-vacation'
								to='/vacation/new'
								className={
									btn === 'add-vacation' ? `${s.link} ${s.active}` : `${s.link}`
								}
								onClick={onClickAdminButtonHandler}
							>
								Add vacation
							</Link>
						</div>
						<div
							className={
								btn === 'charts'
									? `${s.linkWrapper} ${s.active}`
									: `${s.linkWrapper}`
							}
						>
							<Link
								to='/vacation/charts'
								data-button-name='charts'
								className={
									btn === 'charts' ? `${s.link} ${s.active}` : `${s.link}`
								}
								onClick={onClickAdminButtonHandler}
							>
								Charts
							</Link>
						</div>
						<div
							className={
								btn === 'csv'
									? `${s.linkWrapper} ${s.active}`
									: `${s.linkWrapper}`
							}
						>
							<Link
								to='/vacation/csv'
								data-button-name='csv'
								className={
									btn === 'csv' ? `${s.link} ${s.active}` : `${s.link}`
								}
								onClick={onClickAdminButtonHandler}
							>
								CSV
							</Link>
						</div>
					</div>
				)}

				{user ? (
					<div className={s.rightMenu}>
						<span className={s.userInfo}>
							Welcome
							<span className={s.userName}>
								{user.firstName} {user.lastName}
							</span>
						</span>

						<Link to='/' className={s.logout} onClick={logoutUser}>
							<img src={LogoutIcon} alt='logout' />
						</Link>
					</div>
				) : (
					<></>
				)}
			</div>
		</header>
	)
}
