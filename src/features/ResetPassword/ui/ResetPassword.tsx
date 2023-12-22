import { Title } from 'src/shared/ui/Title/TItle'
import style from './ResetPassword.module.scss'
import { Input } from 'src/shared/ui/Input/Input'
import { useForm } from 'react-hook-form'
import { sendData } from 'src/shared/lib/api/api'
import { useState, useContext } from 'react'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { BackButton } from 'src/shared/ui/BackButton'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NotificationType, NotificationsContext } from 'src/app/providers/NotificationsProvider'


interface ChangePassword {
    email: string
    password: string
    password_confirmation: string
    token: string
}



export const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        getValues,
    } = useForm<ChangePassword>({ mode: 'onBlur' });
    const [isSending, setIsSending] = useState(false)
    const [params] = useSearchParams()
    const navigate = useNavigate();
    const { addNotification } = useContext(NotificationsContext);

    const token = params.get('pass_reset_token') || ''
    const email = params.get('email') || ''

    const onSubmit = async (data: ChangePassword) => {

        try {
            setIsSending(true);

            const response = await sendData<ChangePassword>({ ...data, token, email }, 'api/v1/password/reset')

            if (!response.ok) {
                throw new Error("Произошла ошибка при отправке данных");
            }

            navigate('/');

        } catch (error) {
            if (error instanceof Error) {
                addNotification(`${error.message}`, NotificationType.Error)
            }

            if (typeof error === 'string') {
                addNotification(`${error}`, NotificationType.Error)
            }

        }
        finally {
            setIsSending(false);
        }
    }

    return (
        <div className={style.resetPassword}>
            <Title className={style.resetPassword__title}>Установите новый пароль</Title>
            <p className={style.resetPassword__text}>Установите новый пароль минимум 8 символов (Для большей безопасности используйте цифры и заглавные буквы)</p>
            <form
                className={style.resetPassword__inputGroup}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    placeholder='Введите новый пароль'
                    className={style.registerByEmail__input}
                    type='password'
                    {...register('password', {
                        required: 'Необходимо заполнить пароль.',
                        minLength: { value: 8, message: 'Минимальная длина пароля 8 символов' },
                        validate: (value) => {
                            return (
                                [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                    pattern.test(value)
                                ) || "Пароль должен содержать как минимум одну заглавную и одну строчную буквы латинского алфавита, одну цифру и один специальный символ (@, $, !, %, *, #, ?, &)"
                            );
                        },
                    })}
                    error={errors.password}
                    touched={touchedFields.password}
                />
                <Input
                    placeholder='Подтвердите новый пароль'
                    className={style.registerByEmail__input}
                    type='password'
                    {...register('password_confirmation', {
                        required: 'Необходимо заполнить пароль.',
                        validate: (value) => {
                            return value === getValues('password') || 'Пароли должны совпадать';
                        }
                    })}
                    error={errors.password_confirmation}
                    touched={touchedFields.password_confirmation}
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
            <div className={style.resetPassword__back}>
                <BackButton />
            </div>
        </div>
    )
}