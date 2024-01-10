import { IFilterItem } from "../models/Filters"

export const generateSelectOptions = (elements: IFilterItem['elements']) => {
  return elements?.map(({ id, data }) => ({ name: data, value: id }))
}