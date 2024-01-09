import { Title } from 'src/shared/ui/Title/TItle'
import style from './RestorePassword.module.scss'
import { Input } from 'src/shared/ui/Input/Input'
import { useForm } from 'react-hook-form'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { BackButton } from 'src/shared/ui/BackButton'
import { useSendData } from 'src/shared/hooks/useSendData'

interface EmailSendToReset {
	email: string
}

export const RestorePassword = () => {
	const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<EmailSendToReset>({ mode: 'onBlur' });
	const { isSending, isSuccess, handleSendData } = useSendData({ url: 'api/v1/password/send' })

	return (
		<div className={style.restorePassword}>
			{
				isSuccess ? <p className={style.restorePassword__messageText}>На указанный Вами email отправлено сообщение для подтверждения</p> :
					<>
						<Title className={style.restorePassword__title}>Восстановление пароля</Title>
						<p className={style.restorePassword__text}>Укажите ваш E-mail с которым вы проходили регистрацию и мы отправим код восстановления</p>
						<form
							className={style.restorePassword__inputGroup}
							onSubmit={handleSubmit(handleSendData)}
						>
							<Input
								placeholder='Введите ваш E-mail'
								className={style.restorePassword__input}
								{...register('email', {
									required: 'Необходимо заполнить email.',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Значение поля не является правильным email адресом.'
									}
								})}
								error={errors.email}
								touched={touchedFields.email}
							/>
							<Button
								theme={ButtonTheme.RED}
								size={ButtonSize.M}
								type='submit'
								isLoading={isSending}
							>
								Отправить
							</Button>
						</form>
						<div className={style.restorePassword__back}>
							<BackButton />
						</div>
					</>
			}
		</div>
	)
}