import { FC, useState } from 'react'
import cardBg from '../../assets/cardBg.jpg'
import likeIcon from '../../assets/icons/liked.png'
import unLikeIcon from '../../assets/icons/unliked.png'
import s from './VacationCard.module.scss'

export const VacationCard: FC = () => {
	const [liked, setIsLiked] = useState(false)

	const onClickHandler = () => {
		setIsLiked(!liked)
	}
	return (
		<div className={s.cardWrapper}>
			<div className={s.likeBtn}>
				{liked ? (
					<img src={likeIcon} onClick={onClickHandler} className={s.likeBtn} />
				) : (
					<img
						src={unLikeIcon}
						onClick={onClickHandler}
						className={s.likeBtn}
					/>
				)}
			</div>
			<div className={s.adminBtns}></div>
			<div className={s.cardImg}>
				<img src={cardBg} alt='card img background' />
			</div>
			<div className={s.cardBody}>
				<div className={s.cardTitle}>Львовские традиции кофе и шоколада</div>
				<div className={s.cardDateTime}>
					<div className={s.startDate}>2023-12-20</div>
					<div className={s.endDate}>2023-12-31</div>
				</div>
				<div className={s.cardDescr}>
					Founded as a Roman city, in the Middle Ages Barcelona became the
					capital of the County of Barcelona.
				</div>
				<div className={s.cardPrice}>670.00$</div>
			</div>
		</div>
	)
}
