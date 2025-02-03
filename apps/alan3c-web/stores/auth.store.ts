import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const bibliographyToken = ref('')
  const submittedPapersToken = ref('')
  onMounted(() => {
    const bibliographyTokenInSession = sessionStorage.getItem('bibliographyToken')
    if (bibliographyTokenInSession) {
      bibliographyToken.value = bibliographyTokenInSession
    }

    const submittedPapersTokenInSession = sessionStorage.getItem('submittedPapersToken')
    if (submittedPapersTokenInSession) {
      submittedPapersToken.value = submittedPapersTokenInSession
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

  // 登出 Bibliography 功能
  const logoutBibliography = () => {
    bibliographyToken.value = ''
    sessionStorage.removeItem('bibliographyToken')
    // Cookies.remove('directus_token')
  }

  // 登出  Submitted Papers 功能
  const logoutSubmittedPapers = () => {
    submittedPapersToken.value = ''
    sessionStorage.removeItem('submittedPapersToken')
    // Cookies.remove('directus_token')
  }

  const config = useRuntimeConfig()

  // 取得著作目錄
  const useBibliography = useBibliographyApi(bibliographyToken)

  async function fetchBibliography() {
    if (!bibliographyToken.value)
      return undefined

    const [err, result] = await to(useBibliography.findOne({
      query: {},
    }))

    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }

    return result
  }

  const useSubmittedPapers = useBibliographyApi(submittedPapersToken)

  async function fetchSubmittedPapers() {
    console.log('submittedPapersToken.value', submittedPapersToken.value)
    if (!submittedPapersToken.value)
      return undefined

    const [err, result] = await to(useSubmittedPapers.findSubmittedPapers({
      query: {},
    }))

    console.log('result', result)

    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }
    console.log('test', result)
    return result
  }

  // 登入 Bibliography 功能
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

  // 登入 Submitted Papers 功能
  async function loginSubmittedPapers(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()
      sessionStorage.setItem('submittedPapersToken', data.data.access_token)
      submittedPapersToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  return {
    bibliographyToken,
    submittedPapersToken,
    loginBibliography,
    loginSubmittedPapers,
    fetchBibliography,
    fetchSubmittedPapers,
    logoutBibliography,
    logoutSubmittedPapers,
  }
})
