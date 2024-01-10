import { ChangeEvent, useEffect, useState } from "react";
import { FormValue, IFilterItem, RangeValue } from "../models/Filters";
import { generateDefaultValue } from "../lib/generateDefaultValue";

export const useFiltersState = (filterObjects?: IFilterItem[]) => {
  const [formValues, setFormValues] = useState<Record<string, FormValue>>({});

  const onInputChange = (name: string, option?: keyof RangeValue) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (option) {
      setFormValues(prev => (
        {
          ...prev,
          [name]: { ...(prev[name] as RangeValue), [option]: value }
        }
      ))
      return
    }

    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  const onSelectChange = (name: string) => (value: string | string[]) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  }

  const onCheckboxChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    setFormValues(prev => ({ ...prev, [name]: checked }));
  }

  const resetFormValues = () => {
    setFormValues(generateDefaultValue(filterObjects))
  }

  //установка значений по дефолту
  useEffect(() => {
    if (filterObjects) {
      resetFormValues();
    }
  }, [filterObjects])

  return {
    formValues,
    onSelectChange,
    onCheckboxChange,
    onInputChange,
    resetFormValues
  }
}