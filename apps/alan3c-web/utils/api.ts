import { to } from './await-to-js'

const baseURL = 'http://0.0.0.0:8080/items'

console.log('baseURL', baseURL)
interface RequestParams<T> {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  data?: T;
}

type DataType = Record<string, any> | undefined

export async function request<ReturnData, Param extends DataType = undefined>(params: RequestParams<Param>) {
  const { url, method, data } = params

  const [err, result] = await to($fetch<ReturnData>(url, {
    baseURL,
    method,
    body: method === 'get' || method === 'delete' ? undefined : data,
  }))
  if (err) {
    return Promise.reject(err)
  }
  return result
}
