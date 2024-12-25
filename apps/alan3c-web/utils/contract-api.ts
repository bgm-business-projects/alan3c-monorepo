import { type AppRouter, initClient, tsRestFetchApi } from '@ts-rest/core'
import { defaultsDeep } from 'lodash-es'

export function useClient<T extends AppRouter>(
  router: T,
  baseHeaders?: object,
  option?: Parameters<typeof initClient>[1],
) {
  // 取得 .env 檔案中的 NUXT_API_BASE_URL
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiBaseUrl

  return initClient(router, {
    baseUrl: apiUrl,
    baseHeaders: defaultsDeep(baseHeaders, {}),
    api: async (args) => {
      return tsRestFetchApi(args).then((res) => {
        return res
      })
    },
    ...option,
  })
}
