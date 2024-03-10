import {generateUrlParams} from "./generateUrlParams"

interface GetDataParams {
  url?: string
  dataFlag?: boolean // флаг для получения данных или респонса
  headers?: Record<string, string>
  baseUrl?: string
  params?: Record<string, string | number | undefined>
  next?: NextFetchRequestConfig
  cache?: RequestCache
  defaultErrorMessage?: string
}

const BASE_URL = 'https://remeslo.pisateli-studio.ru'

export interface DataResponse<T> {
  data: T
  status: 'OK' | 'Not Found' | 'Internal Server Error'
  message: string
}

export const getData = async <T extends {}>
({
   baseUrl = BASE_URL,
   dataFlag,
   url,
   headers = {},
   params = {},
   next = {},
   cache,
   defaultErrorMessage = "Произошла ошибка при получении данных",
 }: GetDataParams): Promise<T> => {
  const queryParams = JSON.stringify(params) === '{}' ? '' : '?' + generateUrlParams(params);
  const response = await fetch(`${baseUrl}${url}${queryParams}`, {
    headers,
    next,
    cache,
  })
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message ? data.message : defaultErrorMessage)
  }
  return dataFlag ? data.data : data;
}

interface sendDataParams<T> {
  baseUrl?: string
  data: T,
  url: string,
  headers?: Record<string, string>
  method?: string
  params?: Record<string, string | number | undefined>
  defaultErrorMessage?: string
}

export const sendData = async <DataType extends {}>
({
   baseUrl = BASE_URL,
   data,
   url,
   headers = {},
   method = 'post',
   params = {},
   defaultErrorMessage = "Произошла ошибка при отправке данных",
 }: sendDataParams<DataType>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)))
  const queryParams = JSON.stringify(params) === '{}' ? '' : '?' + generateUrlParams(params);
  const response = await fetch(`${baseUrl}${url}${queryParams}`, {
    body: data ? formData : undefined,
    method,
    headers: {
      'Accept': 'application/json',
      ...headers
    }
  })
  const dataJson = await response.json();
  if (!response.ok) {
    throw new Error(dataJson?.message ? dataJson.message : defaultErrorMessage)
  }
  return dataJson;
}