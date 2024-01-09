import { Input } from 'src/shared/ui/Input/Input'
import { Title } from 'src/shared/ui/Title/TItle'
import style from './AuthByEmail.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import googleIcon from 'src/shared/assets/googleIcon.svg'
import vkIcon from 'src/shared/assets/vkIcon.svg'
import { useForm } from 'react-hook-form'
import { IUser, useAuth } from 'src/app/providers/AuthProvider'
import { useSendData } from 'src/shared/hooks/useSendData'

interface EmailAuth {
  email: string
  password: string
}

export interface ResponseUserData {
  data: {
    token: string
    user: IUser
  }
}

export const AuthByEmail = () => {
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<EmailAuth>({ mode: 'onBlur' })
  const { setUserData } = useAuth();
  const navigate = useNavigate();

  const { isSending, handleSendData } = useSendData({
    url: 'api/v1/login', onSuccess: (userData: ResponseUserData) => {
      setUserData({ token: userData.data.token, user: userData.data.user });
      navigate('/')
    }
  })

  return (
    <div className={style.authByEmail}>
      <Title>Войти</Title>
      <p className={style.authByEmail__text}>Стань покупателем или начни продавать свое</p>
      <form
        className={style.authByEmail__inputGroup}
        onSubmit={handleSubmit(handleSendData)}
      >
        <Input
          placeholder='Введите ваш E-mail'
          className={style.authByEmail__input}
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
          className={style.authByEmail__input}
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
      <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        className={style.authByEmail__socialButton}
      >
        <img src={googleIcon} alt="Иконка Google" height={24} width={24} />
        Войти с помощью Google
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        className={style.authByEmail__socialButton}
      >
        <img src={vkIcon} alt="Иконка VK" width={24} height={24} />
        Войти с помощью Vkontakte
      </Button>
      <Link to='reset-password' className={style.authByEmail__link}>
        <GreyText className='textUnderline'>Забыли пароль?</GreyText>
      </Link>
      <GreyText className={style.authByEmail__link}>
        Еще нет аккаунта? &nbsp;
        <Link to='/registration' className='textUnderline'>Зарегестрируйтесь</Link>
      </GreyText>
    </div>
  )
}