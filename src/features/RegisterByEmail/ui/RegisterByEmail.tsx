"use client"
import { useSendData } from '@shared/hooks/useSendData'
import { NotificationType, useNotification } from '@providers/NotificationsProvider'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { Title } from '@shared/ui/Title'
import style from './RegisterByEmail.module.scss'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import Link from 'next/link'
import { SocialAuthButton } from '@shared/ui/SocialAuthButton/SocialAuthButton'

interface EmailRegistration {
  firstname: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
}

export const RegisterByEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<EmailRegistration>({ mode: 'onBlur' });
  /* const navigate = useNavigate(); */
  const { addNotification } = useNotification()

  const { isSending, handleSendData } = useSendData({
    url: 'api/v1/registration/email', onSuccess: () => {
      /* navigate("/login") */
      addNotification(`На указанный Вами email ${getValues('email')} отправлено сообщение для подтверждения`, NotificationType.Info)
    }
  })

  return (
    <>
      <Title>Регистрация</Title>
      <p className={style.text}>Стань покупателем или начни продавать свое</p>
      <form onSubmit={handleSubmit(handleSendData)} className={style.inputGroup}>
        <Input
          placeholder='Введите ваше Имя'
          className={style.input}
          {...register('firstname', {
            required: 'Необходимо заполнить имя.',
          })}
          error={errors.firstname}
          touched={touchedFields.firstname}
        />
        <Input
          placeholder='Введите вашу Фамилию'
          className={style.input}
          {...register('lastname', {
            required: 'Необходимо заполнить фамилию.',
          })}
          error={errors.lastname}
          touched={touchedFields.lastname}
        />
        <Input
          placeholder='Введите ваш E-mail'
          className={style.input}
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
        <Input
          placeholder='Введите пароль'
          className={style.input}
          type='password'
          {...register('password', {
            required: 'Необходимо заполнить пароль.',
            minLength: { value: 8, message: 'Минимальная длина пароля 8 символов' },
            validate: (value) => {
              return (
                [/[a-z]/, /[A-Z]/, /[0-9]/].every((pattern) =>
                  pattern.test(value)
                ) || "Пароль должен содержать как минимум одну заглавную и одну строчную буквы латинского алфавита и одну цифру"
              );
            },
          })}
          error={errors.password}
          touched={touchedFields.password}
        />
        <Input
          placeholder='Подтвердить пароль'
          className={style.input}
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
          Регистрация
        </Button>
      </form>
      <p className={cn(style.link, 'greyText')}>
        Уже есть аккаунт? &nbsp;
        <Link href='/login' className='textUnderline'>Войти</Link>
      </p>
      <SocialAuthButton />
    </>
  )
}