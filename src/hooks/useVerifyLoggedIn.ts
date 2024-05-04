import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { autoLogin } from '../services/AuthService'
import { getTokensFromStorage } from '../utils/utils'
import { useAppDispatch } from './TypedAppDispatch'
import { useAppSelector } from './TypedAppSelector'

function useVerifyLoggedIn() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const { accessToken, refreshToken } = getTokensFromStorage()

		if (!accessToken && !refreshToken) {
			navigate('/')
		} else {
			dispatch(autoLogin())
		}
	}, [])

	return useAppSelector(state => state.auth.user)
}

export default useVerifyLoggedIn
