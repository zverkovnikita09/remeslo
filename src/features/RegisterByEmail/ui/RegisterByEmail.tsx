import { Title } from 'src/shared/ui/Title/TItle'
import { Input } from 'src/shared/ui/Input/Input'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import googleIcon from 'src/shared/assets/googleIcon.svg'
import vkIcon from 'src/shared/assets/vkIcon.svg'
import { Link } from 'react-router-dom'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import style from './RegisterByEmail.module.scss'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { sendData } from 'src/shared/lib/api/api'



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

  const [isSending, setIsSending] = useState(false);
  const [isUserCreated, setUserCreated] = useState(false);

  const onSubmit = async (data: EmailRegistration) => {
    try {
      setIsSending(true);
      const response = await sendData<EmailRegistration>(data, 'api/v1/registration/email')
      
      if (!response.ok) {
        throw new Error("Произошла ошибка при отправке данных");
      }

      setUserCreated(true);

    } catch (error) {
      console.log(error);

    }
    finally {
      setIsSending(false);
    }
  }

  return (
    <div className={style.registerByEmail}>
      {
        isUserCreated ? <p className={style.registerByEmail__messageText}>На указанный Вами email {getValues('email')} отправлено сообщение для подтверждения</p> :
          <>
            <Title>Регистрация</Title>
            <p className={style.registerByEmail__text}>Стань покупателем или начни продавать свое</p>
            <form onSubmit={handleSubmit(onSubmit)} className={style.registerByEmail__inputGroup}>
              <Input
                placeholder='Введите ваше Имя'
                className={style.registerByEmail__input}
                {...register('firstname', {
                  required: 'Необходимо заполнить имя.',
                })}
                error={errors.firstname}
                touched={touchedFields.firstname}
              />
              <Input
                placeholder='Введите вашу Фамилию'
                className={style.registerByEmail__input}
                {...register('lastname', {
                  required: 'Необходимо заполнить фамилию.',
                })}
                error={errors.lastname}
                touched={touchedFields.lastname}
              />
              <Input
                placeholder='Введите ваш E-mail'
                className={style.registerByEmail__input}
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
                placeholder='Подтвердить пароль'
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
                disabled={isSending}
              >
                Регистрация
              </Button>
            </form>
            <GreyText className={style.registerByEmail__link}>
              Уже есть аккаунт? &nbsp;
              <Link to='/login' className='textUnderline'>Войти</Link>
            </GreyText>
            <Button
              theme={ButtonTheme.OUTLINE}
              className={style.registerByEmail__socialButton}
              size={ButtonSize.M}
            >
              <img src={googleIcon} alt="Google" height={24} width={24} />
              Войти с помощью Google
            </Button>
            <Button
              theme={ButtonTheme.OUTLINE}
              className={style.registerByEmail__socialButton}
              size={ButtonSize.M}
            >
              <img src={vkIcon} alt="VK" width={24} height={24} />
              Войти с помощью Vkontakte
            </Button>
          </>
      }

    </div>
  )
}