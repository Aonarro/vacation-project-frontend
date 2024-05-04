import s from './Button.module.scss'

interface IButton {
	children: React.ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset' // Тип кнопки
}

export const Button = ({ children, onClick, type = 'button' }: IButton) => {
	return (
		<button className={s.gradientButton} onClick={onClick} type={type}>
			{children}
		</button>
	)
}
