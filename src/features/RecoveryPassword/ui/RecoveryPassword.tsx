"use client"
import { Title } from '@shared/ui/Title/TItle'
import { Input } from '@shared/ui/Input/Input'
import { useForm } from 'react-hook-form'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button/Button'
import { BackButton } from '@shared/ui/BackButton'
import { useSendData } from '@shared/hooks/useSendData'
import { redirect } from 'next/navigation'
import style from './RecoveryPassword.module.scss'
import { ChangePassword } from '..'

interface RecoveryPasswordProps {
  tokenQuery: string
  emailQuery: string
}

export const RecoveryPassword = ({ tokenQuery, emailQuery }: RecoveryPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<ChangePassword>({ mode: 'onBlur' });

  const token = tokenQuery || '';
  const email = emailQuery || '';

  const { isSending, handleSendData } = useSendData({ url: '/api/v1/password/reset', onSuccess: () => redirect("/main") })

  return (
    <div className={style.resetPassword}>
      <Title as='h2' className={style.title}>Установите новый пароль</Title>
      <p className={style.text}>Установите новый пароль минимум 8 символов (Для большей безопасности используйте цифры и заглавные буквы)</p>
      <form
        className={style.inputGroup}
        onSubmit={handleSubmit((data) => handleSendData({ ...data, token, email }))}
      >
        <Input
          placeholder='Введите новый пароль'
          className={style.input}
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
          Отправить
        </Button>
      </form>
      <div className={style.back}>
        <BackButton />
      </div>
    </div>
  )
}