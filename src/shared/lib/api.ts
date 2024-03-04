import { generateUrlParams } from "./generateUrlParams"

interface GetDataParams {
  url?: string
  dataFlag?: boolean // флаг для получения данных или респонса
  headers?: Record<string, string>
  baseUrl?: string
  params?: Record<string, string | number | undefined>
  next?: NextFetchRequestConfig
  cache?: RequestCache
}

const BASE_URL = 'https://remeslo.pisateli-studio.ru'

export interface DataResponse<T> {
  data: T
  status: 'OK' | 'Not Found' | 'Internal Server Error'
  message: string
}

export const getData = async <T extends object>({
  baseUrl = BASE_URL,
  dataFlag,
  url,
  headers = {},
  params = {},
  next = {},
  cache
}: GetDataParams): Promise<T> => {
  const queryParams = JSON.stringify(params) === '{}' ? '' : '?' + generateUrlParams(params);
  const response = await fetch(`${baseUrl}${url}${queryParams}`, {
    headers,
    next,
    cache,
  })
  if (!response.ok) {
    throw new Error('Something went`s wrong');
  }
  const data = await response.json();
  return dataFlag ? data.data : data;
}

interface sendDataParams<T> {
  data: T,
  url: string,
  headers?: Record<string, string>
}

export const sendData = async<DataType extends {}>({ data, url, headers = {} }: sendDataParams<DataType>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)))
  const status = await fetch(`${BASE_URL}/${url}`, {
    body: formData,
    method: 'post',
    headers: {
      'Accept': 'application/json',
      ...headers
    }
  })
  return status;
}