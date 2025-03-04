export function combineImageUrl(url?: string) {
  const config = useRuntimeConfig()
  if (!url)
    return ''

  return `${config.public.apiBaseCSRUrl}/assets/${url}`
}
