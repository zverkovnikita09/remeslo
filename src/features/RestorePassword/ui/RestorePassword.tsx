import { Title } from 'src/shared/ui/Title/TItle'
import style from './RestorePassword.module.scss'
import { Input } from 'src/shared/ui/Input/Input'
import { useForm } from 'react-hook-form'
import { sendData } from 'src/shared/lib/api/api'
import { useState } from 'react'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { BackButton } from 'src/shared/ui/BackButton'


interface EmailSendToReset {
    email: string
}



export const RestorePassword = () => {
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<EmailSendToReset>({ mode: 'onBlur' });
    const [isSending, setIsSending] = useState(false)
    const [isEmailSend, setEmailSend] = useState(false);

    const onSubmit = async (data: EmailSendToReset) => {

        try {
            setIsSending(true);
            const response = await sendData<EmailSendToReset>(data, 'api/v1/password/send')

            if (!response.ok) {
                throw new Error("Произошла ошибка при отправке данных");
            }

            setEmailSend(true);
        } catch (error) {

        }
        finally {
            setIsSending(false);
        }
    }


    return (
        <div className={style.restorePassword}>
            {
                isEmailSend ? <p className={style.restorePassword__messageText}>На указанный Вами email отправлено сообщение для подтверждения</p> :
                    <>
                        <Title className={style.restorePassword__title}>Восстановление пароля</Title>
                        <p className={style.restorePassword__text}>Укажите ваш E-mail с которым вы проходили регистрацию и мы отправим код восстановления</p>
                        <form
                            className={style.restorePassword__inputGroup}
                            onSubmit={handleSubmit(onSubmit)}
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
                                disabled={isSending}
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