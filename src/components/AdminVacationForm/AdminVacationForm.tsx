import { ChangeEvent, FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import s from './AdminVacationForm.module.scss'
import { addNewVacation } from '../../services/VacationsService'
import { useNavigate } from 'react-router-dom'
import { successNewVacationNotify } from '../../services/NotifyService'

interface IAddNewVacationFormValues {
	destination: string
	description: string
	startDate: string
	endDate: string
	price: string
	file: File
}

interface IAdminVacationFormProps {
	notifyMessage: string
}

export const AdminVacationForm: FC<IAdminVacationFormProps> = ({
	notifyMessage,
}) => {
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddNewVacationFormValues>()

	const onFormSubmit = async (formData: IAddNewVacationFormValues) => {
		await dispatch(addNewVacation({ ...formData }))
		setPreview(null)
		navigate('/vacations')
		successNewVacationNotify(notifyMessage)
	}

	const handleFilePreview = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) {
			setPreview(null)
			return
		}

		const urlImage = URL.createObjectURL(file)
		setPreview(urlImage)
	}
	return (
		<form className={s.vacationForm} onSubmit={handleSubmit(onFormSubmit)}>
			<input
				className={`${s.vacationInput} ${
					errors.destination ? s.input_error : ''
				}`}
				type='text'
				{...register('destination', {
					required: 'destination is required',
				})}
				placeholder='Destination'
			/>
			{errors.destination && (
				<span className={s.inputErrorMsg}>{errors.destination.message}</span>
			)}

			<input
				className={`${s.vacationInput} ${
					errors.description ? s.input_error : ''
				}`}
				type='text'
				{...register('description', {
					required: 'description is required',
				})}
				placeholder='Description'
			/>
			{errors.description && (
				<span className={s.inputErrorMsg}>{errors.description.message}</span>
			)}

			<input
				className={`${s.vacationInput} ${
					errors.startDate ? s.input_error : ''
				}`}
				type='date'
				{...register('startDate', { required: 'startDate is required' })}
				placeholder='Start Date'
			/>
			{errors.startDate && (
				<span className={s.inputErrorMsg}>{errors.startDate.message}</span>
			)}

			<input
				className={`${s.vacationInput} ${errors.endDate ? s.input_error : ''}`}
				type='date'
				{...register('endDate', { required: 'endDate is required' })}
				placeholder='End Date'
			/>
			{errors.endDate && (
				<span className={s.inputErrorMsg}>{errors.endDate.message}</span>
			)}

			<input
				className={`${s.vacationInput} ${errors.price ? s.input_error : ''}`}
				type='number'
				{...register('price', { required: 'price is required' })}
				placeholder='Price'
			/>
			{errors.price && (
				<span className={s.inputErrorMsg}>{errors.price.message}</span>
			)}

			<div className={s.fileInputWrapper}>
				<div className={s.fileUpload}>
					<label>
						<input
							type='file'
							{...register('file', {
								required: 'image is required',
								onChange(event) {
									handleFilePreview(event)
								},
							})}
						/>
						<span>Select Image</span>
					</label>
				</div>
				<div className={s.imgPreview}>
					<img src={preview} alt='' />
				</div>
			</div>
			{errors.file && (
				<span className={s.inputErrorMsg}>{errors.file.message}</span>
			)}
			<Button type='submit'>Save</Button>
		</form>
	)
}
