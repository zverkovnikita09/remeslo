"use client"
import { SingleGoods } from '@fullpages/ViewPage'
import style from './ReviewFormPopup.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { Popup } from '@shared/ui/Popup'
import { Title, TitleSize } from '@shared/ui/Title'
import Image from 'next/image'
import { Rating, RatingType } from '@shared/ui/Rating'
import { Input } from '@shared/ui/Input'
import { ImageFileInput } from '@shared/ui/ImageFileInput'
import { Toggler } from '@shared/ui/Toggler'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'

interface ReviewFormPopupProps {
	goodInfo?: SingleGoods
	isActive: boolean
	closePopup: () => void
	openReviewPopup?(): void
	backToReview?: boolean
}

interface ReviewForm {
	user_id: string
	estimation: number
	review: string
	files: FileList | null
}

export const ReviewFormPopup = ({ goodInfo, isActive, closePopup, backToReview, openReviewPopup }: ReviewFormPopupProps) => {
	const { control, handleSubmit, setValue, setError, watch, formState: { errors, /* touchedFields */ }, clearErrors } = useForm<ReviewForm>({ defaultValues: { files: null } });

	const onSubmit = (data: ReviewForm) => {
		console.log(data);
	}

	const files: FileList | null = watch('files');

	const { data: sessionData } = useSession();

	const closeFormPopup = () => {
		closePopup();
		backToReview && openReviewPopup?.();
	}

	return (
		<Popup isActive={isActive} closePopup={closeFormPopup} >
			<form onSubmit={handleSubmit(onSubmit)} className={style.reviewFormPopup}>
				<Title size={TitleSize.S}>Ваш отзыв о товаре</Title>
				<div className={style.goodInfo}>
					<Image src={goodInfo?.files?.[0].path ?? ''} className={style.goodImage} alt={''} fill />
					<div className={style.goodTitle}>{goodInfo?.title}</div>
				</div>
				<div className={style.rateGood}>
					<div className={style.subtitle}>Оцените покупку</div>
					<Controller
						name="estimation"
						control={control}
						rules={{ required: true }}
						render={(props) => <Rating type={RatingType.Editable} onChange={props.field.onChange} />}
					/>
				</div>

				<div className={style.review}>
					<div className={style.subtitle}>Поделитесь впечатлениями</div>
					<Input wrapperClassName={style.input} placeholder='Достоинства' />
					<Input wrapperClassName={style.input} placeholder='Недостатки' />
					<Input wrapperClassName={style.input} placeholder='Комментарий' />
				</div>

				<div className={style.addImage}>
					<div className={style.subtitle}>Добавьте фотографии</div>
					<ImageFileInput
						files={files}
						setFiles={(files) =>
							setValue('files', files)
						}
						setError={(message) => setError('files', { type: 'custom', message })}
						error={errors.files}
						clearErrors={() => clearErrors('files')}
					/>
				</div>

				<div className={style.userData}>
					<div className={style.userWrapper}>
						<div className={style.subtitle}>Вы оставляете отзыв как:</div>
						<div className={style.userName}>{sessionData?.user.user?.profile?.firstname}</div>
					</div>
					<Toggler>Скрыть мои данные</Toggler>
				</div>


				<div className={style.buttons}>
					<Button
						className={style.button}
						theme={ButtonTheme.OUTLINE}
						size={ButtonSize.M}
						onClick={closeFormPopup}
					>
						Отмена
					</Button>
					<Button
						className={style.button}
						theme={ButtonTheme.RED}
						size={ButtonSize.M}
						type='submit'
					>
						Оставить отзыв
					</Button>
				</div>
			</form>
		</Popup>
	)
}