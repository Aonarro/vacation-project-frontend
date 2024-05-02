import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactNotifications } from 'react-notifications-component'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Pages/LayoutPage/LayoutPage'
import './index.scss'
import { store } from './store/Store'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReactNotifications />
		{/* Provider store */}
		<Provider store={store}>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)
