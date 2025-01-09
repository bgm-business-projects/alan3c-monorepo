<template>
  <div class="fixed py-1rem flex justify-center layout-padding w-full z-9999">
    <div class="flex items-center max-width border rounded-.7rem lg:rounded-1rem lg:border-none lg:rounded-0 overflow-hidden ">
      <div class="w-full lg:w-auto flex flex-col">
        <div class="flex items-center bg-[#f4f4f4] px-1rem lg:px-2rem py-.5rem rounded-.5rem lg:border gap-1rem">
          <div class="flex flex-row items-center gap-.5rem">
            <nuxt-img
              src="/logo.png"
              class="w-1.7rem mt-.2rem"
            />
            <div class="font-600">
              多媒體暨網路安全實驗室
            </div>
          </div>
          <div
            class="flex-1 flex justify-end lg:hidden"
            @click="showMenu = !showMenu"
          >
            <div class="relative w-1.5rem h-1rem">
              <div
                class="absolute top-0% w-full h-full flex items-start origin-c duration-500"
                :class="showMenu ? '!top-50% !h-2px rotate-45' : ''"
              >
                <div
                  class="w-full border-black border-solid border-t-2px"
                />
              </div>
              <div
                class="absolute top-0% w-full h-full flex items-center duration-300 duration-500"
                :class="showMenu ? 'opacity-0' : ''"
              >
                <div
                  class="w-full border-black border-solid border-t-2px"
                />
              </div>
              <div
                class="absolute top-0% w-full h-full flex items-end origin-c duration-500"
                :class="showMenu ? '!top-50% !h-2px rotate--45' : ''"
              >
                <div
                  class="w-full border-black border-solid border-t-2px"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 手機版選單 -->
        <div
          class="overflow-hidden lg:hidden duration-500 bg-[#f4f4f4]"
          :class="showMenu ? 'h-[calc(100dvh-6rem)]' : 'h-0'"
        >
          <div class="justify-center p-1rem">
            <div class="flex gap-.5rem font-500 border rounded-.5rem w-full py-.5rem flex justify-center">
              <div @click="setLocale('zh')">
                中
              </div>
              <div>/</div>
              <div @click="setLocale('en')">
                英
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="w-full border-[#E1E1E1] border-solid border-t-1px" />
            <template
              v-for="item in data"
              :key="item"
            >
              <div class="px-1rem border-b-1px border-[#E1E1E1] border-solid py-.7rem">
                <nuxt-link
                  :to="decodeURIComponent(localePath(item.route))"
                  class="flex w-full gap-1rem"
                  @click="showMenu = false"
                >
                  <div class="flex-1">
                    {{ item.name }}
                  </div>
                  <div>
                    <q-icon name="chevron_right" />
                  </div>
                </nuxt-link>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 電腦版選單 -->
      <div class="hidden lg:!flex items-center border rounded-.5rem px-2rem py-.5rem gap-x-1.5rem flex-1 bg-[#f4f4f4]">
        <div class="flex gap-x-1.5rem gap-y-.5rem  flex-1">
          <nuxt-link
            v-for="item in data"
            :key="item.name"
            :to="decodeURIComponent(localePath(item.route))"
            class="font-500 relative py-.15rem link"
          >
            <div
              class="absolute bottom-0 border-primary border-solid border-b-3px duration-300"
              :class="isActiveStyle(localePath(item.route))"
            />
            {{ item.name }}
          </nuxt-link>
        </div>
        <div class="flex font-500 relative">
          <div
            class="h-100% aspect-1/1 absolute bg-primary rounded-full duration-300"
            :class="circlePosition"
          />
          <div class="relative px-.2rem cursor-pointer" @click="setLocale('zh')">
            中
          </div>
          <div class="relative px-.3rem">
            /
          </div>
          <div class="relative px-.2rem cursor-pointer" @click="setLocale('en')">
            英
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { setLocale } = useI18n()
const { locale } = useI18n()

const route = useRoute()

const useTraineeCategory = useTraineeCategoryApi()
const { data: traineeCategories, refresh: refreshTraineeCategories } = useLazyAsyncData('trainee-category', async () => {
  const [err, result] = await to (useTraineeCategory.findList())
  if (err) {
    return Promise.reject(err)
  }
  return result
}, {
  transform: (data) => {
    return data?.data.map((item) => {
      return {
        ...item,
        translations: item.translations.filter((item) => item.traineeCategoryLanguages_code === locale.value)[0],
      }
    })
  },
  watch: [locale],
})

const data = computed(() => [
  {
    name: '老闆的家',
    route: {
      name: 'home',
    },
  },
  {
    name: '我的徒弟',
    route: {
      name: 'trainee',
      query: {
        category: traineeCategories.value?.find((item) => item.translations.traineeCategoryLanguages_code === locale.value)?.translations.name,
      },
    },
  },
  {
    name: '研究重點',
    route: {
      name: 'research-focus',
    },
  },
  {
    name: '圖像處理 Seminar',
    route: {
      name: 'image-processing',
    },
  },
  {
    name: '人工智慧 Seminar',
    route: {
      name: 'artificial-intelligence',
    },
  },
  {
    name: '參考文件',
    route: {
      name: 'reference-document',
    },
  },
  {
    name: '課程教材',
    route: {
      name: 'course-materials',
    },
  },
  {
    name: '演講 PPT',
    route: {
      name: 'lecture-ppt',
    },
  },
])

const localePath = useLocalePath()

const showMenu = ref(false)

const circlePosition = computed(() => {
  if (locale.value === 'zh') {
    return 'left-0'
  }
  else if (locale.value === 'en') {
    return 'left-100% translate-x-[-100%]'
  }
  return ''
})

function isActiveStyle(localePath: string) {
  const pathWithoutQuery = localePath.split('?')[0].split('#')[0]
  if (route.name === 'home' && pathWithoutQuery === '/') {
    return 'w-full'
  }
  return route.name === pathWithoutQuery.split('/')[1] ? 'w-full' : 'w-0'
}
</script>

<style scoped lang="sass">
.link
  &:hover
    div
      width: 100%
</style>
