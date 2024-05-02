const setTokens = (access_token: string, refresh_token: string) => {
	clearTokens()
	localStorage.setItem('accessToken', access_token)
	document.cookie = `refreshToken=${refresh_token}; path=/`
}

const clearTokens = () => {
	localStorage.removeItem('accessToken')
	document.cookie =
		'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export { clearTokens, setTokens }
