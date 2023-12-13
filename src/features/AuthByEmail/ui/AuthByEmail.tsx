import { Input } from 'src/shared/ui/Input/Input'
import { Title } from 'src/shared/ui/Title/TItle'
import style from './AuthByEmail.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import googleIcon from 'src/shared/assets/googleIcon.svg'
import vkIcon from 'src/shared/assets/vkIcon.svg'
import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react'
import { sendData } from 'src/shared/lib/api/api'
import { AuthContext, IUser } from 'src/app/providers/AuthProvider'
import { NotificationType, NotificationsContext } from 'src/app/providers/NotificationsProvider'
import { RadioButton } from 'src/shared/ui/RadioButton/RadioButton'

interface EmailAuth {
  email: string
  password: string
  radio: 'ba' | 'ba1'
}

export interface ResponseUserData {
  data: {
    token: string
    user: IUser
  }
}

export const AuthByEmail = () => {
  const { addNotification } = useContext(NotificationsContext);
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<EmailAuth>({ mode: 'onBlur', defaultValues: {radio:'ba'} })
  const [isSending, setIsSending] = useState(false)
  const { setUserData } = useContext(AuthContext)
  const navigate = useNavigate();


  const onSubmit = async (data: EmailAuth) => {

    try {
      setIsSending(true);
      const response = await sendData<EmailAuth>(data, 'api/v1/login')
      
      if (!response.ok) {
        throw new Error(response.statusText || "Произошла ошибка при отправке данных");
      }

      const userData: ResponseUserData = await response.json();
      setUserData({ token: userData.data.token, user: userData.data.user });
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
    <div className={style.authByEmail}>
      <Title>Войти</Title>
      <p className={style.authByEmail__text}>Стань покупателем или начни продавать свое</p>
      <form
        className={style.authByEmail__inputGroup}
        onSubmit={handleSubmit(onSubmit)}
      >
        <RadioButton  {...register('radio')} value={'ba'} id={'ba'}>хуй пизда</RadioButton>
        <RadioButton {...register('radio')} value={'ba1'} id={'ba1'}>хуй пизда</RadioButton>
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
          disabled={isSending}
        >
          Войти
        </Button>
      </form>
      <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        className={style.authByEmail__socialButton}
      >
        <img src={googleIcon} alt="Google" height={24} width={24} />
        Войти с помощью Google
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        className={style.authByEmail__socialButton}
      >
        <img src={vkIcon} alt="VK" width={24} height={24} />
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