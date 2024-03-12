import {Fragment, useState} from "react";
import {Input} from "@shared/ui/Input";
import {TextArea, TextAreaTheme} from "@shared/ui/TextArea";
import {AddGoodProperty} from "@features/AddProperty/models/addGoodProperty.models";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import styles from './AddProperty.module.scss';

interface AddPropertyProps {
  title?: string
}

export const AddProperty = ({title}: AddPropertyProps) => {
  const [propertiesValue, setPropertiesValue] = useState<AddGoodProperty[]>([{id: 1, name: '', description: ''}]);
  return (
    <div className={styles.addProperty}>
      {title && <p className={styles.title}>{title}</p>}
      {propertiesValue.map(({name, description, id}) => (
        <Fragment key={id}>
          <Input
            placeholder='Название опции'
            value={name}
          />
          <TextArea
            placeholder='Значение опции'
            value={description}
          />
        </Fragment>

      ))}
      {propertiesValue.length < 6 &&
          <Button
              className={styles.button}
              theme={ButtonTheme.OUTLINE}
              size={ButtonSize.M}
          >
              + Новая опция
          </Button>
      }
    </div>
  );
};
