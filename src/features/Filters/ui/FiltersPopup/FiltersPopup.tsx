import { Popup } from 'src/shared/ui/Popup/Popup'
import style from './FiltersPopup.module.scss'
import { Title, TitleSize } from 'src/shared/ui/Title/TItle'
import { Input } from 'src/shared/ui/Input/Input'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { useForm } from 'react-hook-form'
import { Checkbox, Select } from '@mui/material'
import { RadioButton } from 'src/shared/ui/RadioButton/RadioButton'
/* import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api' */

interface FiltersPopupProps {
  isActive: boolean
  closePopup: () => void
}

interface IFilterItemMain {
  id: string
  title: string
  filterable: 1 | 0
}

interface IFilterItemElement {
  id: string
  data: string
}

interface IFilterItemWithElements {
  type: 'select' | 'multiple_select' | 'radio_button' | 'checkbox'
  elements: IFilterItemElement[]
}

interface IFilterItemWithoutElements {
  type: 'range_input' | 'input_by_value' | 'input_like'
  elements: null
}

type IFilterItem = IFilterItemMain & (IFilterItemWithElements | IFilterItemWithoutElements)

let elements: IFilterItem[] = [];
export const FiltersPopup = ({ closePopup, isActive }: FiltersPopupProps) => {
  const { register } = useForm();
  /*   const { data } = useQuery({
      queryKey: slug,
      queryFn: () => getData<IFilterItem>({
        url: `/api/v1/good/${slug}`,
        dataFlag: true
      }),
    }) */

  const generateFilterFormObjects = ({ type }: IFilterItem): JSX.Element => {

    switch (type) {
      case 'select':
        return (<Select />)
      case 'multiple_select':
        return (<Select multiple />)
      case 'range_input':
        return (
          <div className={style.filtersPopup__inputs}>
            <Input />
            <Input />
          </div>
        )
      case 'checkbox':
        return (<Checkbox />)
      case 'radio_button':
        return (<RadioButton />)
      case 'input_by_value':
        return (
          <Input />
        )
      case 'input_like':
        return (<Input />)
      default:
        const unknownItem: never = type;
        throw new Error(`Неизвестный тип инпута ${unknownItem}`);
    }
  }

  return (
    <Popup isActive={isActive} closePopup={closePopup}>
      <div className={style.filtersPopup}>
        <Title size={TitleSize.S}>Настройки</Title>
        <div>
          {elements?.map((item) => (
            <div key={item.id}>
              <p className={style.filtersPopup__sectionTitle}>
                {item.title}
              </p>
              {/* {generateFilterFormObjects(item)} */}
            </div>
          ))}
        </div>
        {/*         <p className={style.filtersPopup__sectionTitle}>Категории</p>
        <div className={style.filtersPopup__categories}>

        </div>
        <p className={style.filtersPopup__sectionTitle}>Цена ₽</p>
        <p className={style.filtersPopup__sectionTitle}>Состояние</p>
        <p className={style.filtersPopup__sectionTitle}>Слова в описании</p>
        <Input placeholder='Что-то важное для вас' /> */}
        {/* <p className={style.filtersPopup__sectionTitle}>Выберите цвет</p> */}
        <div className={style.filtersPopup__buttons}>
          <Button
            className={style.filtersPopup__button}
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.M}
            onClick={closePopup}
          >
            Отмена
          </Button>
          <Button
            className={style.filtersPopup__button}
            theme={ButtonTheme.RED}
            size={ButtonSize.M}
          >
            Применить
          </Button>
        </div>
      </div>
    </Popup>
  )
}