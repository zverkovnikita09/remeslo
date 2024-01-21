"use client"
import { useForm } from 'react-hook-form'
import { EmailAuth, ResponseUserData } from '..'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import Link from 'next/link'
import cn from 'classnames'
import style from './AuthByEmail.module.scss'
import { useSendData } from '@shared/hooks/useSendData'
import { Title } from '@shared/ui/Title'
import { SocialAuthButton } from '@shared/ui/SocialAuthButton/SocialAuthButton'

export const AuthByEmail = () => {
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<EmailAuth>({ mode: 'onBlur' })
  /* const { setUserData } = useAuth(); */
  /* const navigate = useNavigate(); */

  const { isSending, handleSendData } = useSendData({
    url: 'api/v1/login', onSuccess: (userData: ResponseUserData) => {
      /* setUserData({ token: userData.data.token, user: userData.data.user }); */
      /* navigate('/') */
    }
  })

  return (
    <>
      <Title className={style.title}>Войти</Title>
      <p className={style.text}>Стань покупателем или начни продавать свое</p>
      <form
        className={style.inputGroup}
        onSubmit={handleSubmit(handleSendData)}
      >
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
          })}
          error={errors.password}
          touched={touchedFields.password}
        />
        <Button
          theme={ButtonTheme.RED}
          size={ButtonSize.M}
          type='submit'
          isLoading={isSending}
        >
          Войти
        </Button>
      </form>
      {/* <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        className={style.authByEmail__socialButton}
      >
        <Image src={googleIcon} alt="Иконка Google" height={24} width={24} />
        Войти с помощью Google
      </Button> */}
      <SocialAuthButton />
      <Link href='reset-password' className={cn(style.link, 'textUnderline', 'greyText')}>
        Забыли пароль?
      </Link>
      <p className={cn(style.link, 'greyText')}>
        Еще нет аккаунта? &nbsp;
        <Link href='/register' className='textUnderline'>Зарегестрируйтесь</Link>
      </p>
    </>
  )
}