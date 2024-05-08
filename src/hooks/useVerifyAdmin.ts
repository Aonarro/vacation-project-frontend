import { useEffect, useState } from 'react'
import { useAppSelector } from './TypedAppSelector'

const useVerifyAdmin = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (user?.roleId === 2) {
			setIsAdmin(true)
		} else {
			setIsAdmin(false)
		}
	}, [user])

	return isAdmin
}

export default useVerifyAdmin
