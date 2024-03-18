"use client"
import { Title } from '@shared/ui/Title'
import style from './EditProfile.module.scss'
import { UserPhoto, UserPhotoSize } from '@shared/ui/UserPhoto'
import { User } from '@shared/models/user.model'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import Image from 'next/image'
import camera from '@images/camera.svg'
import { Input } from '@shared/ui/Input'
import { useForm } from 'react-hook-form'
import { EditUser } from '../model/editUser.model'
import { useSendData } from '@shared/hooks/useSendData'
import { NotificationType, useNotification } from '@providers/NotificationsProvider'
import { FileInput } from "@shared/ui/FileInput";

interface EditProfileProps {
  user?: User
}

export const EditProfile = ({ user }: EditProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    setError,
    watch,
  } = useForm<EditUser>(
    {
      mode: 'onBlur',
      defaultValues: {
        email: user?.email ?? '',
        firstname: user?.profile?.firstname ?? '',
        lastname: user?.profile?.lastname ?? '',
        avatar: null
      }
    }
  );

  const avatar: File | null = watch('avatar');

  const { addNotification } = useNotification();

  const { isSending, handleSendData } = useSendData({
    url: '', onSuccess: () => {
      addNotification("Данные успешно сохранены", NotificationType.Success);
    }
  })

  const onCancellChanges = () => {
    setValue('email', user?.email ?? '');
    setValue('firstname', user?.profile?.firstname ?? '');
    setValue('lastname', user?.profile?.lastname ?? '');
    setValue('avatar', null);
  }

  const onSubmit = (data: EditUser) => {
    /**
     * Если значения в инпуте не изменились, не отправляем форму
     */
    if (
      data.email === user?.email &&
      data.firstname === user?.profile?.firstname &&
      data.lastname === user?.profile?.lastname
    ) return
    handleSendData(data)
  }

  return (
    <form className={style.editProfile} onSubmit={handleSubmit(onSubmit)}>
      <Title>Настройки профиля</Title>
      <div className={style.editPhoto}>
        <FileInput
          className={style.userPhotoButton}
          file={avatar}
          setFile={(avatar) => setValue('avatar', avatar)}
          setError={(message) => setError('avatar', { type: 'custom', message })}
        >
          <Image src={camera} className={style.cameraImage} width={26} height={26} alt='Иконка камеры' />
          <UserPhoto imageSize={UserPhotoSize.L} avatar={avatar ? URL.createObjectURL(avatar) : user?.profile?.avatar} />
        </FileInput>
        <div>
          <p>Изменить аватар</p>
          <Button className={style.downloadButton}>Загрузить</Button>
        </div>
      </div>
      <Input
        placeholder='Введите имя'
        label='Изменить имя'
        {...register("firstname", { required: 'Поле Имя обязательное для заполнения' })}
        error={errors.firstname}
      />
      <Input
        placeholder='Введите фамилию'
        label='Изменить фамилию'
        {...register("lastname", { required: 'Поле Фамилия обязательное для заполнения' })}
        error={errors.lastname}
      />
      <Input
        placeholder='Введите номер телефона'
        label='Изменить номер телефона'
        {...register("phone", { required: 'Поле Телефон обязательное для заполнения' })}
        error={errors.lastname}
      />
      <Input
        placeholder='Введите E-mail'
        label='Изменить E-mail'
        {...register("email", {
          required: 'Поле E-mail обязательное для заполнения',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Значение поля не является правильным email адресом.'
          }
        })}
        error={errors.email}
        type='email'
      />
      <div className={style.buttons}>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.M}
          className={style.button}
          onClick={onCancellChanges}
          withAlert
          alertPopupProps={{ confirmText: "Вы уверены, что хотите отменить изменения?" }}
        >
          Отменить
        </Button>
        <Button
          type='submit'
          theme={ButtonTheme.RED}
          size={ButtonSize.M}
          className={style.button}
          isLoading={isSending}
        >
          Применить
        </Button>
      </div>
    </form>
  )
}