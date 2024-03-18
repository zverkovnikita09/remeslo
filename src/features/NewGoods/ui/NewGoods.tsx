'use client'
import style from './NewGoods.module.scss'
import { Title } from "@shared/ui/Title";
import { ImageFileInput } from "@shared/ui/ImageFileInput";
import { useForm } from "react-hook-form";
import { NewGoodsForm } from "@features/NewGoods";
import { Input } from "@shared/ui/Input";
import { useSendData } from "@shared/hooks/useSendData";
import { SingleGoods } from "@fullpages/ViewPage";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { AddProperty } from "@features/AddProperty";


interface NewGoodsProps {
  goods?: SingleGoods
}

export const NewGoods = ({ goods }: NewGoodsProps) => {
  const {
    handleSubmit,
    setValue,
    setError,
    watch,
    register,
    formState: { errors, /* touchedFields */ },
    clearErrors
  } = useForm<NewGoodsForm>({ defaultValues: { files: null } });

  const { } = useSendData({
    url: '',
    onSuccess: () => {
    }
  });

  const files: FileList | null = watch('files');

  return (
    <form className={style.newGoods}>
      <Title className={style.title}>Новая публикация</Title>
      <ImageFileInput
        files={files}
        setFiles={(files) =>
          setValue('files', files)
        }
        setError={(message) => setError('files', { type: 'custom', message })}
        error={errors.files}
        clearErrors={() => clearErrors('files')}
        label='Добавьте фотографии'
      />
      <Input
        placeholder='Введите название'
        label='Название обьявления'
        {...register("title", { required: 'Поле Название обязательное для заполнения' })}
        error={errors.title}
      />
      <Input
        placeholder='Кратко опишите свой товар'
        label='Описание товара'
        {...register("description", { required: 'Поле Описание обязательное для заполнения' })}
        error={errors.description}
      />
      {/*      <Select
        placeholder='Создайте категорию товара'
        label='Категория товара'
        {...register("tag_id", {required: 'Поле Категория обязательное для заполнения'})}
        error={errors.tag_id}

      />*/}
      <Input
        placeholder='Укажите цену'
        label='Цена ₽'
        {...register("price", { required: 'Поле Цена обязательное для заполнения' })}
        error={errors.price}
      />

      <AddProperty
        title={'Создайте уникальные характеристики для своего товара (не более 5). Перечислите значения опции, отделяя их переносом строки. '}
      />

      <Button className={style.button} theme={ButtonTheme.RED} type={"submit"} size={ButtonSize.M}>Опубликовать</Button>
    </form>
  );
};
