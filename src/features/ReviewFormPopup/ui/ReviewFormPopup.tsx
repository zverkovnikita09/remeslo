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
import {TextArea, TextAreaTheme} from "@shared/ui/TextArea";
import {useSendData} from "@shared/hooks/useSendData";
import {useParams} from "next/navigation";
import {useState} from "react";

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
	advantages: string
	disadvantages: string
	files: FileList | null
}

export const ReviewFormPopup = ({ goodInfo, isActive, closePopup, backToReview, openReviewPopup }: ReviewFormPopupProps) => {
	const { control, handleSubmit, setValue, setError, watch, formState: { errors, /* touchedFields */ }, clearErrors, register } = useForm<ReviewForm>({ defaultValues: { files: null } });

	const { data: sessionData } = useSession();

	const [isHideUserData, setIsHideUserData] = useState(false);

	const closeFormPopup = () => {
		closePopup();
		backToReview && openReviewPopup?.();
	}

	const {slug} = useParams();
	const {handleSendData, isSending } = useSendData({
		url: `api/v1/good/rating/${slug}`,
		onSuccess: closeFormPopup
	});

	const onSubmit = (data: ReviewForm) => {
		const newData: Partial<ReviewForm> = !isHideUserData ? {...data, user_id: sessionData?.user.user?.id! } : data;
		delete newData.files;
		handleSendData(newData);
	}

	const files: FileList | null = watch('files');

	return (
		<Popup isActive={isActive} closePopup={closeFormPopup} >
			<form onSubmit={handleSubmit(onSubmit)} className={style.reviewFormPopup}>
				<Title size={TitleSize.S}>Ваш отзыв о товаре</Title>
				<div className={style.goodInfo}>
					<Image src={goodInfo?.files?.[0].path ?? ''} className={style.goodImage} alt={''} width={100} height={100} />
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
					<TextArea
						defaultHeight={58}
						maxSize={170} autosize
						label='Достоинства'
						placeholder='Достоинства'
						theme={TextAreaTheme.INPUT_LIKE}
						{...register('advantages', {required: false})}
					/>
					<TextArea
						defaultHeight={58}
						maxSize={170}
						autosize
						label='Недостатки'
						placeholder='Недостатки'
						theme={TextAreaTheme.INPUT_LIKE}
						{...register('disadvantages', {required: false})}
					/>
					<TextArea
						defaultHeight={58}
						maxSize={170}
						autosize
						label='Комментарий'
						placeholder='Комментарий'
						theme={TextAreaTheme.INPUT_LIKE}
						{...register('review', {required: 'Поле Комментарий обязательно для заполнения'})}
					/>
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
					<Toggler
						checked={isHideUserData}
						onChange={(e) => setIsHideUserData(e.target.checked)}
					>
						Скрыть мои данные
					</Toggler>
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
						isLoading={isSending}
						type='submit'
					>
						Оставить отзыв
					</Button>
				</div>
			</form>
		</Popup>
	)
}