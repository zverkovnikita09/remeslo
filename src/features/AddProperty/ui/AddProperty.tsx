import { ChangeEvent, Fragment, useState } from "react";
import { Input } from "@shared/ui/Input";
import { TextArea, TextAreaTheme } from "@shared/ui/TextArea";
import { AddGoodProperty } from "@features/AddProperty/models/addGoodProperty.models";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import styles from './AddProperty.module.scss';

interface AddPropertyProps {
  title?: string
}

export const AddProperty = ({ title }: AddPropertyProps) => {
  const [propertiesValue, setPropertiesValue] = useState<AddGoodProperty[]>([{ id: 0, name: '', description: '' }]);

  const addNewOption = () => {
    setPropertiesValue(prev => [...prev, { id: performance.now(), name: '', description: '' }])
  }

  const onOptionChange = (id: number) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const idx = propertiesValue.findIndex((item) => item.id === id);
    const element = propertiesValue.find((item) => item.id === id);
    if (!element) return
    setPropertiesValue((prev) => [...prev.slice(0, idx), { ...element, [e.target.name]: e.target.value }, ...prev.slice(idx + 1)])
  }

  return (
    <div className={styles.addProperty}>
      {title && <p className={styles.title}>{title}</p>}
      {propertiesValue.map(({ name, description, id }) => (
        <Fragment key={id}>
          <Input
            placeholder='Название опции'
            value={name}
            onChange={onOptionChange(id)}
            name="name"
          />
          <TextArea
            placeholder='Значение опции'
            value={description}
            defaultHeight={97}
            maxSize={200}
            autosize
            name="description"
            onChange={onOptionChange(id)}
          />
        </Fragment>

      ))}
      {propertiesValue.length < 5 &&
        <Button
          className={styles.button}
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.M}
          onClick={addNewOption}
        >
          + Новая опция
        </Button>
      }
    </div>
  );
};
