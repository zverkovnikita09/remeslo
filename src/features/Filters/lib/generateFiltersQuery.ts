import { FormValue, RangeValue } from "../models/Filters";

export const generateFiltersQuery = (params: Record<string, FormValue>): string | undefined => {
  console.log(params)
  const attributes: Record<string, FormValue>[] = [];
  const param_values: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      param_values.push(value.map(item => `param_values[]=${item}`).join("&"))
      return
    }
    if (key.includes("select")) {
      param_values.push(`param_values[]=${value}`)
      return
    }
    if (typeof value === 'boolean' && !!value) {
      param_values.push(`param_values[]=${key}`)
      return
    }

    attributes.push({ [key]: value })
  })

  const attributesStrings = attributes.map((item, index) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];

    if (typeof value === "string") {
      return `attributes[${index}][parameter_id]=${key}&attributes[${index}][data]=${value}`
    }
    if (typeof value === "object") {
      return `attributes[${index}][paramert_id]=${key}&attributes[${index}][from]=${(value as RangeValue).from}&attributes[${index}][to]=${(value as RangeValue).to}`
    }
  })
  if (attributes.length || param_values.length) {
    console.log(attributes, param_values)
    return `?${[...attributesStrings, ...param_values].join("&")}`
  }
}