import { Store } from 'react-notifications-component'

export const successAuthorizationNotify = (message: string) => {
	Store.addNotification({
		title: 'Welcome!',
		message,
		type: 'success',
		insert: 'top',
		container: 'bottom-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 3000,
			onScreen: true,
		},
	})
}

export const successNewVacationNotify = (message: string) => {
	Store.addNotification({
		title: 'Success!',
		message,
		type: 'success',
		insert: 'top',
		container: 'bottom-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 3000,
			onScreen: true,
		},
	})
}

export const errorAuthorizationNotify = (message: string) => {
	Store.addNotification({
		title: 'An error has occurred',
		message,
		type: 'danger',
		insert: 'top',
		container: 'bottom-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 3000,
			onScreen: true,
		},
	})
}

export const warningLogoutNotify = (message: string) => {
	Store.addNotification({
		title: 'Good bye!',
		message,
		type: 'default',
		insert: 'top',
		container: 'bottom-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 3000,
			onScreen: true,
		},
	})
}
