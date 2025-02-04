import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const bibliographyToken = ref('')
  const submittedPapersToken = ref('')
  const internationalJournalPapersCreatorToken = ref('')
  const imageProcessingToken = ref('')
  const imageProcessingCreatorToken = ref('')
  const artificialIntelligenceToken = ref('')
  const artificialIntelligenceCreatorToken = ref('')

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

    const imageProcessingTokenInSession = sessionStorage.getItem('imageProcessingToken')
    if (imageProcessingTokenInSession) {
      imageProcessingToken.value = imageProcessingTokenInSession
    }

    const imageProcessingCreatorTokenInSession = sessionStorage.getItem('imageProcessingCreatorToken')
    if (imageProcessingCreatorTokenInSession) {
      imageProcessingCreatorToken.value = imageProcessingCreatorTokenInSession
    }

    const artificialIntelligenceTokenInSession = sessionStorage.getItem('artificialIntelligenceToken')
    if (artificialIntelligenceTokenInSession) {
      artificialIntelligenceToken.value = artificialIntelligenceTokenInSession
    }

    const artificialIntelligenceCreatorTokenInSession = sessionStorage.getItem('artificialIntelligenceCreatorToken')
    if (artificialIntelligenceCreatorTokenInSession) {
      artificialIntelligenceCreatorToken.value = artificialIntelligenceCreatorTokenInSession
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

  // 登出  Submitted Papers 功能
  const logoutInternationalJournalPapersCreator = () => {
    internationalJournalPapersCreatorToken.value = ''
    sessionStorage.removeItem('internationalJournalPapersToken')
    // Cookies.remove('directus_token')
  }

  // 登出  Image Processing Creator 功能
  const logoutImageProcessingCreator = () => {
    imageProcessingCreatorToken.value = ''
    sessionStorage.removeItem('imageProcessingCreatorToken')
    // Cookies.remove('directus_token')
  }

  // 登出 Artificial Intelligence Creator 功能
  const logoutArtificialIntelligenceCreator = () => {
    artificialIntelligenceCreatorToken.value = ''
    sessionStorage.removeItem('artificialIntelligenceCreatorToken')
    // Cookies.remove('directus_token')
  }

  const config = useRuntimeConfig()

  // 取得著作目錄
  async function fetchBibliography() {
    const useBibliography = useBibliographyApi(bibliographyToken)
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

  // 取得 International Journal Papers
  async function fetchInternationalJournalPapers() {
    const useInternationalJournalPapers = useInternationalJournalPapersApi(bibliographyToken)
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

  // 取得 Submitted Papers
  async function fetchSubmittedPapers() {
    const useSubmittedPapers = useBibliographyApi(submittedPapersToken)
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

  // 取得 Image Processing
  async function fetchImageProcessing(limit: number = 15, offset: number = 0, keyword: string | undefined = undefined) {
    const useImageProcessing = useImageProcessingApi(imageProcessingToken)
    if (!imageProcessingToken.value)
      return undefined

    const [err, result] = await to(useImageProcessing.findList({
      query: {
        'filter[thesisTitle][_icontains]': keyword,
        'limit': `${limit}`,
        'offset': `${offset}`,
      },
    }))

    if (err) {
      // logoutBibliography()
      throw new Error(err.message)
    }
    return result
  }

  // 取得 Artificial Intelligence
  async function fetchArtificialIntelligence(limit: number = 15, offset: number = 0, keyword: string | undefined = undefined) {
    const useArtificialIntelligence = useArtificialIntelligenceApi(artificialIntelligenceToken)
    if (!artificialIntelligenceToken.value)
      return undefined

    const [err, result] = await to(useArtificialIntelligence.findList({
      query: {
        'filter[thesisTitle][_icontains]': keyword,
        'limit': `${limit}`,
        'offset': `${offset}`,
      },
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

      const useInternationalJournalPapersCreator = useInternationalJournalPapersApi(data.data.access_token)

      const [err, result] = await to(useInternationalJournalPapersCreator.checkUser())
      if (err) {
        // logoutBibliography()
        throw new Error(err.message)
      }
      if (result.body?.data?.id !== '94695a57-cecd-4173-9962-0dd05657d99c') {
        throw new Error('身份驗證錯誤，無建立資料權限')
      }
      sessionStorage.setItem('internationalJournalPapersToken', data.data.access_token)
      internationalJournalPapersCreatorToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  // 用於測試 International Journal Papers Creator Token 是否過期
  async function checkInternationalJournalPapersUser(token: globalThis.Ref<string>) {
    const useInternationalJournalPapersCreator = useInternationalJournalPapersApi(token)
    const [err, result] = await to(useInternationalJournalPapersCreator.checkUser())
    if (err) {
      // logoutBibliography()
      console.log('checkErr', err)
      throw new Error(err.message)
    }
    if (result.body?.data?.id !== '94695a57-cecd-4173-9962-0dd05657d99c') {
      throw new Error('身份驗證錯誤，無建立資料權限')
    }
    console.log('checkResult', result)
    return result
  }

  // 登入 Image Processing 功能
  async function loginImageProcessing(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()
      sessionStorage.setItem('imageProcessingToken', data.data.access_token)
      imageProcessingToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  // 登入 Artificial Intelligence 功能
  async function loginArtificialIntelligence(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()
      sessionStorage.setItem('artificialIntelligenceToken', data.data.access_token)
      artificialIntelligenceToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  // 用於測試 Image Processing Creator Token 是否過期
  async function checkImageProcessingCreatorUser(token: globalThis.Ref<string>) {
    const useImageProcessingCreator = useImageProcessingApi(token)
    const [err, result] = await to(useImageProcessingCreator.checkUser())
    if (err) {
      // logoutBibliography()
      console.log('checkErr', err)
      throw new Error(err.message)
    }
    if (result.body?.data?.id !== '614a40cc-f9dd-43a3-b5f1-7309fd8d22f9') {
      throw new Error('身份驗證錯誤，無建立資料權限')
    }
    console.log('checkResult', result)
    return result
  }

  // 登入 Image Processing Creator 功能
  async function loginImageProcessingCreator(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()

      const useImageProcessingCreator = useImageProcessingApi(data.data.access_token)

      const [err, result] = await to(useImageProcessingCreator.checkUser())
      // console.log('checkUser', result)
      // return result?.body.data?.id
      if (err) {
        throw new Error(err.message)
      }
      if (result.body?.data?.id !== '614a40cc-f9dd-43a3-b5f1-7309fd8d22f9') {
        throw new Error('身份驗證錯誤，無建立資料權限')
      }
      sessionStorage.setItem('imageProcessingCreatorToken', data.data.access_token)
      imageProcessingCreatorToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  // 用於測試 Artificial Intelligence Creator Token 是否過期
  async function checkArtificialIntelligenceCreatorUser(token: globalThis.Ref<string>) {
    const useArtificialIntelligenceCreator = useArtificialIntelligenceApi(token)
    const [err, result] = await to(useArtificialIntelligenceCreator.checkUser())
    if (err) {
      throw new Error(err.message)
    }
    if (result.body?.data?.id !== 'd594ddb5-903d-41f4-94ef-9cf946aaf0de') {
      throw new Error('身份驗證錯誤，無建立資料權限')
    }
    return result
  }

  // 登入 Artificial Intelligence Creator 功能
  async function loginArtificialIntelligenceCreator(email: string, password: string) {
    try {
      const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok)
        throw new Error('登入失敗，請檢查帳號密碼')

      const data = await response.json()

      const useArtificialIntelligenceCreator = useArtificialIntelligenceApi(data.data.access_token)

      const [err, result] = await to(useArtificialIntelligenceCreator.checkUser())

      if (err) {
        throw new Error(err.message)
      }

      if (result.body?.data?.id !== 'd594ddb5-903d-41f4-94ef-9cf946aaf0de') {
        throw new Error('身份驗證錯誤，無建立資料權限')
      }
      sessionStorage.setItem('artificialIntelligenceCreatorToken', data.data.access_token)
      artificialIntelligenceCreatorToken.value = data.data.access_token
    }
    catch (error) {
      console.error('登入失敗:', error)
      throw error
    }
  }

  return {
    bibliographyToken,
    submittedPapersToken,
    internationalJournalPapersCreatorToken,
    imageProcessingToken,
    artificialIntelligenceToken,
    imageProcessingCreatorToken,
    artificialIntelligenceCreatorToken,
    loginBibliography,
    loginSubmittedPapers,
    loginInternationalJournalPapersCreator,
    loginImageProcessing,
    loginArtificialIntelligence,
    fetchBibliography,
    fetchSubmittedPapers,
    fetchInternationalJournalPapers,
    fetchImageProcessing,
    fetchArtificialIntelligence,
    // fetchInternationalJournalPapersCreator,
    logoutBibliography,
    logoutSubmittedPapers,
    logoutImageProcessingCreator,
    logoutArtificialIntelligenceCreator,
    checkInternationalJournalPapersUser,
    checkImageProcessingCreatorUser,
    checkArtificialIntelligenceCreatorUser,
    logoutInternationalJournalPapersCreator,
    loginImageProcessingCreator,
    loginArtificialIntelligenceCreator,
  }
})
