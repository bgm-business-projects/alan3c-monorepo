<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        學術演講
      </h1>
    </div>
    <div class="max-width flex flex-col gap-1rem">
      <nuxt-link
        v-for="item in compilation?.data"
        :key="item.id"
        :to="localePath({
          name: 'home-compilation-id',
          params: {
            id: item.translations.title,
          },
        })"
        class="border bg-#FDFDFD rounded-.5rem px-2rem py-1rem tracking-.1rem flex items-center"
      >
        <div class="flex-1 font-semibold text-lg">
          {{ item.translations.title }}
        </div>
        <div class="flex items-center gap-.4rem font-semibold border-solid border-black border-1px px-1rem py-.3rem rounded-.5rem">
          <div>更多資訊</div>
          <q-icon name="img:/arrow.svg" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const localePath = useLocalePath()

const useCompilation = useCompilationApi()

const { data: compilation, refresh: refreshCompilation } = useLazyAsyncData('compilation', async () => {
  const [err, result] = await to (useCompilation.findList())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  transform: (data) => {
    const result = data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.compilationLanguages_code === locale.value)[0],
      }
    })
    return {
      data: result,
    }
  },
  watch: [locale],
})

useSeoMeta({
  title: '真誠文集',
  description: '真誠文集',
  keywords: '真誠文集',
  ogTitle: '真誠文集',
  ogDescription: '真誠文集',
})
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
