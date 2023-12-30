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
  type: 'range_input' | 'input_by_value' | 'input_like' | 'info'
  elements: null
}

export type RangeValue = { from: "string", to: "string" }

export type FormValue = string | string[] | boolean | RangeValue

export type IFilterItem = IFilterItemMain & (IFilterItemWithElements | IFilterItemWithoutElements)