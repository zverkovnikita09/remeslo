import { Popup } from 'src/shared/ui/Popup/Popup'
import style from './FiltersPopup.module.scss'
import { Title, TitleSize } from 'src/shared/ui/Title/TItle'
import { Input } from 'src/shared/ui/Input/Input'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import { RadioButton } from 'src/shared/ui/RadioButton/RadioButton'
import { Select } from 'src/shared/ui/Select/Select'
import { Checkbox } from 'src/shared/ui/Checkbox/Checkbox'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'
import { useCategoriesContext } from 'src/app/providers/CategoriesProvider'
import { FormEvent } from 'react'
import { generateFiltersQuery } from '../../lib/generateFiltersQuery'
import { IFilterItem, RangeValue } from '../../models/Filters'
import { useNavigate } from 'react-router-dom'
import { useFiltersState } from '../../hooks/useFiltersState'
import { generateSelectOptions } from '../../lib/generateSelectOptions'

interface FiltersPopupProps {
  isActive: boolean
  closePopup: () => void
}

export const FiltersPopup = ({ closePopup, isActive }: FiltersPopupProps) => {
  const { currentCategory, pathArray } = useCategoriesContext();
  const tagOrSubcategory = pathArray.length > 1 ? 'subcategory_id' : 'tag_id';

  const { data: filterObjects } = useQuery({
    queryKey: currentCategory[2],
    queryFn: () => getData<IFilterItem[]>({
      url: `/api/v1/parameter`,
      params: { [tagOrSubcategory]: currentCategory[2] ?? '' },
      dataFlag: true
    }),
  })

  const {
    formValues,
    onCheckboxChange,
    onInputChange,
    onSelectChange,
    resetFormValues
  } = useFiltersState(filterObjects)

  const navigate = useNavigate();

  const onCancel = () => {
    resetFormValues()
    closePopup()
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({ search: generateFiltersQuery(formValues) })
    closePopup();
  }

  /**
   * Select устанавливает ключ-значение вида select[id] = id | id[]
   * Input устанавливает ключ-значение вида id = value
   * Checkbox устанавливает ключ-значение вида id = boolean
   * Radio устанавливает ключ-значение вида select[id] = id
   */

  const generateFilterFormObjects = ({ type, elements, id, title }: IFilterItem): JSX.Element => {
    switch (type) {
      case 'select':
        return (
          <Select
            options={generateSelectOptions(elements) ?? []}
            value={(formValues[`select[${id}]`] as string) ?? ''}
            setValue={onSelectChange(`select[${id}]`)}
            placeholder={title}
          />
        )
      case 'multiple_select':
        return (
          <Select
            multiple options={generateSelectOptions(elements) ?? []}
            value={(formValues[`select[${id}]`] as string[]) ?? []}
            setValue={onSelectChange(`select[${id}]`)}
            placeholder={title}
          />
        )
      case 'range_input':
        return (
          <div className={style.filtersPopup__inputs}>
            <Input
              value={(formValues[id] as RangeValue)?.['from'] as string ?? ''}
              onChange={onInputChange(id, "from")}
              placeholder={`${title} от:`}
            />
            <Input
              value={(formValues[id] as RangeValue)?.['to'] as string ?? ''}
              onChange={onInputChange(id, "to")}
              placeholder={`${title} до:`}
            />
          </div>
        )
      case 'checkbox':
        return (
          <div className={style.filtersPopup__checkboxes}>
            {elements.map(({ data, id }) => (
              <Checkbox
                key={id}
                textPosition='right'
                checked={(formValues[id] as boolean) ?? false}
                onChange={onCheckboxChange(id)}>
                {data}
              </Checkbox>
            ))}
          </div>
        )
      case 'radio_button':
        return (
          <div className={style.filtersPopup__radios}>
            {elements.map(({ data, id: itemId }) => (
              <RadioButton
                key={itemId}
                onChange={() => onSelectChange(`select[${id}]`)(itemId)}
                checked={formValues[`select[${id}]`] === itemId}
              >
                {data}
              </RadioButton>
            ))}
          </div>
        )
      case 'input_by_value':
        return (
          <Input value={formValues[id] as string ?? ''} onChange={onInputChange(id)} />
        )
      case 'info':
        return (
          <Input value={formValues[id] as string ?? ''} onChange={onInputChange(id)} />
        )
      case 'input_like':
        return (<Input value={formValues[id] as string ?? ''} onChange={onInputChange(id)} />)
      default:
        const unknownItem: never = type;
        throw new Error(`Неизвестный тип инпута ${unknownItem}`);
    }
  }

  return (
    <Popup isActive={isActive} closePopup={closePopup}>
      <form className={style.filtersPopup} onSubmit={onSubmit}>
        <Title size={TitleSize.S}>Настройки</Title>
        <div>
          {!!filterObjects?.length &&
            filterObjects.map((item) => (
              <div key={item.id}>
                <p className={style.filtersPopup__sectionTitle}>
                  {item.title}
                </p>
                {generateFilterFormObjects(item)}
              </div>
            ))}
        </div>
        <div className={style.filtersPopup__buttons}>
          <Button
            className={style.filtersPopup__button}
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.M}
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button
            className={style.filtersPopup__button}
            theme={ButtonTheme.RED}
            size={ButtonSize.M}
            type="submit"
          >
            Применить
          </Button>
        </div>
      </form>
    </Popup>
  )
}