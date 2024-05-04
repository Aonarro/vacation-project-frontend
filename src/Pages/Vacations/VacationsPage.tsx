import api from '../../api/axios'

export const VacationsPage = () => {
	async function ProtectedFunc() {
		const response = await api.get('protected')
		console.log(response)
	}

	return (
		<div>
			VacationsPage
			<button onClick={ProtectedFunc}>Click</button>
		</div>
	)
}
