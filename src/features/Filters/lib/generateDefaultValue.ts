import { FormValue, IFilterItem } from "../models/Filters";

export const generateDefaultValue = (filterObjects?: IFilterItem[]): Record<string, FormValue> => {
  const obj: Record<string, FormValue> = {};
  filterObjects?.filter(({ type }) => type === 'radio_button').forEach(({ elements, id }) => obj[`select[${id}]`] = elements![0].id)
  return obj;
}