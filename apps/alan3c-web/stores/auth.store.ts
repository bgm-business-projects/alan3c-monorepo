import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const bibliographyToken = ref('')
  onMounted(() => {
    const tokenInSession = sessionStorage.getItem('bibliographyToken')
    if (tokenInSession) {
      bibliographyToken.value = tokenInSession
    }
    // watch(bibliographyToken, (token) => {
    //   if (import.meta.server)
    //     return
    //   const tokenInSession = sessionStorage.getItem('bibliographyToken')
    //   if (tokenInSession && tokenInSession !== token) {
    //     bibliographyToken.value = tokenInSession
    //   }
    //   else {
    //     sessionStorage.setItem('bibliographyToken', token)
    //   }
    // }, {
    //   immediate: true,
    // })
  })

  // 登出功能
  const logoutBibliography = () => {
    bibliographyToken.value = ''
    sessionStorage.removeItem('bibliographyToken')
    // Cookies.remove('directus_token')
  }

  const config = useRuntimeConfig()

  // 取得著作目錄
  const useBibliography = useBibliographyApi(bibliographyToken)
  async function fetchBibliography() {
    if (!bibliographyToken.value)
      return undefined

    const [err, result] = await to (useBibliography.findOne({
      query: {},
    }))

    if (err) {
      logoutBibliography()
      throw new Error('錯誤登出')
    }

    return result
  }

  // 登入功能
  async function loginBibliography(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()
      sessionStorage.setItem('bibliographyToken', data.data.access_token)
      bibliographyToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  return {
    bibliographyToken,
    loginBibliography,
    fetchBibliography,
    logoutBibliography,
  }
})
