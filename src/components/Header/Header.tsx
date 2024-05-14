import { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoutIcon from '../../assets/icons/logOutIcon.svg'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import useVerifyAdmin from '../../hooks/useVerifyAdmin'
import { warningLogoutNotify } from '../../services/NotifyService'
import { logout } from '../../store/AuthSlice/AuthSlice'
import { removeTokens } from '../../utils/utils'
import s from './Header.module.scss'

export const Header: FC = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.auth.user)
	const navigate = useNavigate()
	const [adminBtn, setAdminBtn] = useState<string | null>()
	const isAdmin = useVerifyAdmin()
	const location = useLocation()

	const buttonsData = [
		{ name: 'add-vacation', label: 'Add vacation', to: '/vacation/new' },
		{ name: 'charts', label: 'Charts', to: '/vacation/charts' },
		{ name: 'csv', label: 'CSV', to: '/vacation/csv' },
	]

	useEffect(() => {
		if (!location.pathname.includes('/vacation')) {
			setAdminBtn(null)
		}
	}, [location.pathname])

	const logoutUser = () => {
		setAdminBtn(null)
		dispatch(logout())
		removeTokens()
		warningLogoutNotify('See you next time ')
	}

	const onClickLogoHandler = () => {
		user ? navigate('/vacations') : navigate('/')
		setAdminBtn(null)
	}

	const onClickAdminButtonHandler = (btnId: string) => {
		setAdminBtn(btnId)
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
						{buttonsData.map(({ name, label, to }) => {
							return (
								<div
									key={name}
									className={
										adminBtn === name
											? `${s.linkWrapper} ${s.active}`
											: `${s.linkWrapper}`
									}
								>
									<Link
										to={to}
										data-button-name={name}
										className={
											adminBtn === name ? `${s.link} ${s.active}` : `${s.link}`
										}
										onClick={() => onClickAdminButtonHandler(name)}
									>
										{label}
									</Link>
								</div>
							)
						})}
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
