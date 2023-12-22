import { SingleGoods } from 'src/pages/ViewPage/ui/ViewPage'
import style from './ReviewFormPopup.module.scss'
import { Popup } from 'src/shared/ui/Popup/Popup'
import { Title, TitleSize } from 'src/shared/ui/Title/TItle'
import { ImageFileInput } from 'src/shared/ui/ImageFileInput/ImageFileInput'
import { Rating } from 'src/features/Rating'
import { RatingType } from 'src/features/Rating/ui/Rating'
import { Controller, useForm } from 'react-hook-form'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { Input } from 'src/shared/ui/Input/Input'
import { Checkbox } from 'src/shared/ui/Checkbox/Checkbox'
import { useContext } from 'react'
import { AuthContext } from 'src/app/providers/AuthProvider'


interface ReviewFormPopupProps {
    goodInfo?: SingleGoods
    isActive: boolean
    closePopup: () => void
}

interface ReviewForm {
    user_id: string
    estimation: number
    review: string
    files: FileList | null
}

export const ReviewFormPopup = ({ goodInfo, isActive, closePopup }: ReviewFormPopupProps) => {
    const { control, handleSubmit, setValue, setError, watch, formState: { errors, /* touchedFields */ }, clearErrors } = useForm<ReviewForm>({ defaultValues: { files: null } });

    const onSubmit = (data: ReviewForm) => {
        console.log(data);

    }

    const files: FileList | null = watch('files');
    const { user: { profile } } = useContext(AuthContext);


    return (
        <Popup isActive={isActive} closePopup={closePopup} >
            <form onSubmit={handleSubmit(onSubmit)} className={style.reviewFormPopup}>
                <Title size={TitleSize.S}>Ваш отзыв о товаре</Title>
                <div className={style.reviewFormPopup__goodInfo}>
                    <img src={goodInfo?.files?.[0].path ?? ''} className={style.reviewFormPopup__goodImage} />
                    <div className={style.reviewFormPopup__goodTitle}>{goodInfo?.title}</div>
                </div>
                <div className={style.reviewFormPopup__rateGood}>
                    <div className={style.reviewFormPopup__subtitle}>Оцените покупку</div>
                    <Controller
                        name="estimation"
                        control={control}
                        rules={{ required: true }}
                        render={(props) => <Rating type={RatingType.Editable} onChange={props.field.onChange} />}
                    />

                </div>

                <div className={style.reviewFormPopup__review}>
                    <div className={style.reviewFormPopup__subtitle}>Поделитесь впечатлениями</div>
                    <Input wrapperClassName={style.reviewFormPopup__input} placeholder='Достоинства' />
                    <Input wrapperClassName={style.reviewFormPopup__input} placeholder='Недостатки' />
                    <Input wrapperClassName={style.reviewFormPopup__input} placeholder='Комментарий' />
                </div>

                <div className={style.reviewFormPopup__addImage}>
                    <div className={style.reviewFormPopup__subtitle}>Добавьте фотографии</div>
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

                <div className={style.reviewFormPopup__userData}>
                    <div className={style.reviewFormPopup__userWrapper}>
                        <div className={style.reviewFormPopup__subtitle}>Вы оставляете отзыв как:</div>
                        <div className={style.reviewFormPopup__userName}>{profile?.firstname}</div>
                    </div>
                    <Checkbox>Скрыть мои данные</Checkbox>
                </div>


                <div className={style.reviewFormPopup__buttons}>
                    <Button
                        className={style.reviewFormPopup__button}
                        theme={ButtonTheme.OUTLINE}
                        size={ButtonSize.M}
                        onClick={closePopup}
                    >
                        Отмена
                    </Button>
                    <Button
                        className={style.reviewFormPopup__button}
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