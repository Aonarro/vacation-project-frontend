import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button/Button'
import s from './AddVacationPage.module.scss'

interface IAddNewVacationFormValues {
	title: string
	description: string
	startDate: string
	endDate: string
	price: string
	image: string
}

export const AddVacationPage: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddNewVacationFormValues>()

	const onFormSubmit = async (formData: IAddNewVacationFormValues) => {
		// addNewVacation
		console.log(formData)
	}

	return (
		<div className={s.vacationPageWrapper}>
			<div className={s.vacationFormBody}>
				<form
					className={s.vacationForm}
					onSubmit={handleSubmit(onFormSubmit)}
					enctype='multipart/form-data'
				>
					<input
						className={`${s.loginInput} ${errors.title ? s.input_error : ''}`}
						type='text'
						{...register('title', { required: 'title is required' })}
						placeholder='title'
					/>
					{errors.title && (
						<span className={s.inputErrorMsg}>{errors.title.message}</span>
					)}

					<input
						className={`${s.loginInput} ${
							errors.description ? s.input_error : ''
						}`}
						type='text'
						{...register('description', {
							required: 'description is required',
						})}
						placeholder='description'
					/>
					{errors.description && (
						<span className={s.inputErrorMsg}>
							{errors.description.message}
						</span>
					)}

					<input
						className={`${s.loginInput} ${
							errors.startDate ? s.input_error : ''
						}`}
						type='date'
						{...register('startDate', { required: 'startDate is required' })}
						placeholder='startDate'
					/>
					{errors.startDate && (
						<span className={s.inputErrorMsg}>{errors.startDate.message}</span>
					)}

					<input
						className={`${s.loginInput} ${errors.endDate ? s.input_error : ''}`}
						type='date'
						{...register('endDate', { required: 'endDate is required' })}
						placeholder='endDate'
					/>
					{errors.endDate && (
						<span className={s.inputErrorMsg}>{errors.endDate.message}</span>
					)}

					<input
						className={`${s.loginInput} ${errors.price ? s.input_error : ''}`}
						type='number'
						{...register('price', { required: 'price is required' })}
						placeholder='price'
					/>
					{errors.price && (
						<span className={s.inputErrorMsg}>{errors.price.message}</span>
					)}

					<input
						className={`${s.loginInput} ${errors.image ? s.input_error : ''}`}
						type='file'
						{...register('image', { required: 'image is required' })}
						placeholder='image'
					/>
					{errors.image && (
						<span className={s.inputErrorMsg}>{errors.image.message}</span>
					)}
					<Button type='submit'>Save</Button>
				</form>
			</div>
		</div>
	)
}
