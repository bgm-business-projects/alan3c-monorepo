import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const bibliographyToken = ref('')
  const submittedPapersToken = ref('')
  const internationalJournalPapersCreatorToken = ref('')

  onMounted(() => {
    const bibliographyTokenInSession = sessionStorage.getItem('bibliographyToken')
    if (bibliographyTokenInSession) {
      bibliographyToken.value = bibliographyTokenInSession
    }

    const submittedPapersTokenInSession = sessionStorage.getItem('submittedPapersToken')
    if (submittedPapersTokenInSession) {
      submittedPapersToken.value = submittedPapersTokenInSession
    }

    const internationalJournalPapersTokenInSession = sessionStorage.getItem('internationalJournalPapersToken')
    if (internationalJournalPapersTokenInSession) {
      internationalJournalPapersCreatorToken.value = internationalJournalPapersTokenInSession
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

  const useBibliography = useBibliographyApi(bibliographyToken)
  // 取得著作目錄
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

  const useInternationalJournalPapers = useInternationalJournalPapersApi(bibliographyToken)
  // 取得 International Journal Papers
  async function fetchInternationalJournalPapers() {
    if (!bibliographyToken.value)
      return undefined

    const [err, result] = await to(useInternationalJournalPapers.findList({
      query: {},
    }))

    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }

    return result
  }

  const useSubmittedPapers = useBibliographyApi(submittedPapersToken)
  // 取得 Submitted Papers
  async function fetchSubmittedPapers() {
    if (!submittedPapersToken.value)
      return undefined

    const [err, result] = await to(useSubmittedPapers.findSubmittedPapers({
      query: {},
    }))

    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }
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

  // 登入 International Journal Papers Creator 功能
  async function loginInternationalJournalPapersCreator(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()
      console.log('data', data)
      sessionStorage.setItem('internationalJournalPapersToken', data.data.access_token)
      internationalJournalPapersCreatorToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  // 用於測試 International Journal Papers Creator Token 是否過期

  const useInternationalJournalPapersCreator = useInternationalJournalPapersApi(internationalJournalPapersCreatorToken ?? bibliographyToken)
  async function fetchInternationalJournalPapersCreator() {
    if (!submittedPapersToken.value)
      return undefined

    const [err, result] = await to(useInternationalJournalPapersCreator.findList())

    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }
    return result
  }

  async function checkInternationalJournalPapersUser() {
    const test = internationalJournalPapersCreatorToken.value ?? bibliographyToken.value
    console.log('test', test)
    const [err, result] = await to(useInternationalJournalPapersCreator.checkUser())
    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }
    return result
  }

  return {
    bibliographyToken,
    submittedPapersToken,
    internationalJournalPapersCreatorToken,
    loginBibliography,
    loginSubmittedPapers,
    loginInternationalJournalPapersCreator,
    fetchBibliography,
    fetchSubmittedPapers,
    fetchInternationalJournalPapers,
    fetchInternationalJournalPapersCreator,
    logoutBibliography,
    logoutSubmittedPapers,
    checkInternationalJournalPapersUser,
  }
})
