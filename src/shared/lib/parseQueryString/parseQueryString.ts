export const parseQueryString = (query: string): Record<string, string> => {
  if (typeof query !== "string") throw new Error("Аргумент функции parseQueryString должен быть строкой")
  if (query[0] !== "?") throw new Error("Строка параметров должна начинаться со знака '?'")
  return query.slice(1).split("&").reduce((acc, item) => {
    const [key, value] = item.split("=");
    return { ...acc, [key]: value }
  }, {})
}