<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-1.5rem lg:py-3rem">
    <div class="flex max-width">
      <base-breadcrumbs
        :bread-list="[
          {
            name: t('navbar.home'),
            route: {
              name: 'home',
            },
          },
          {
            name: t('home.curriculumVitae'),
            route: {
              name: 'home-curriculum-vitae',
            },
          },
        ]"
      />
    </div>
    <div class="flex flex-col gap-1.5rem max-width">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          Curriculum Vitae
        </h1>
      </div>
      <div class="w-full flex flex-col gap-2rem">
        <div class="hidden lg:!flex gap-.5rem">
          <div
            v-for="category in categories" :key="category.name"
            class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem"
            :class="checkActiveStyle(category.route.hash)"
          >
            <nuxt-link
              :to="localePath(category.route)"
            >
              <div class="whitespace-nowrap font-medium">
                {{ category.name }}
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="flex lg:hidden">
          <q-select v-model="targetCategory" :options="options" outlined dense class="flex lg:hidden" />
        </div>
      </div>
    </div>
    <div class="max-width">
      <div
        v-if="!isLoading"
        class="w-full flex flex-col pb-1rem w-full overflow-x-scroll"
      >
        <div id="information" class="text-2xl font-semibold">
          Information
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.curriculumVitae" />
        </div>

        <div id="activities-society" class="text-2xl font-semibold mt-3rem">
          Activities (Society)
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.activitiesSociety" />
        </div>

        <div id="activities-other" class="text-2xl font-semibold mt-3rem">
          Activities (Other)
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.activitiesOther" />
        </div>

        <div id="technical-reviewer" class="text-2xl font-semibold mt-3rem">
          Technical Reviewer
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.technicalReviewer" />
        </div>

        <div id="consulting" class="text-2xl font-semibold mt-3rem">
          Consulting
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.consulting" />
        </div>

        <div id="projects" class="text-2xl font-semibold mt-3rem">
          Projects
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.projects" />
        </div>

        <div id="theses-master" class="text-2xl font-semibold mt-3rem">
          Theses (Master)
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.thesesMaster" />
        </div>

        <div id="awards" class="text-2xl font-semibold mt-3rem">
          Awards
        </div>
        <div class="w-full">
          <div class="w-full" v-html="curriculumVitaeData?.data.awards" />
        </div>
      </div>
      <div v-else class="relative w-full h-300px">
        <q-inner-loading :showing="isLoading" />
      </div>
    </div>
    <div class="fixed bottom-200px max-width flex justify-end layout-padding lg:px-0">
      <div
        class="bg-primary w-3rem aspect-1/1 rounded-full flex justify-center items-center pb-.2rem border-white border-2px border-solid text-white font-semibold cursor-pointer"
        @click="scrollToTop()"
      >
        Top
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnchorScroll } from '~/.nuxt/imports'
import { useCurriculumVitaeDataApi } from '../../composables/use-curriculum-vitae-data-api'

const { scrollToAnchor, scrollToTop } = useAnchorScroll({
  toTop: {
    scrollOptions: {
      behavior: 'smooth',
      offsetTop: 0,
    },
  },
})

const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()

const currentCategory = computed(() => route.hash.slice(1))

const categories = ref([
  {
    name: 'Information',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#information',
    },
  },
  {
    name: 'Activities (Society)',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#activities-society',
    },
  },
  {
    name: 'Activities (Other)',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#activities-other',
    },
  },
  {
    name: 'Technical Reviewer',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#technical-reviewer',
    },
  },
  {
    name: 'Consulting',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#consulting',
    },
  },
  {
    name: 'Projects',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#projects',
    },
  },
  {
    name: 'Theses (Master)',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#theses-master',
    },
  },
  {
    name: 'Awards',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#awards',
    },
  },
])

const useCurriculumVitaeData = useCurriculumVitaeDataApi()

const isLoading = ref(false)

const { data: curriculumVitaeData, refresh: refreshCurriculumVitaeData } = useLazyAsyncData('curriculum-vitae', async () => {
  isLoading.value = true
  const [err, result] = await to (useCurriculumVitaeData.findList())
  if (err) {
    isLoading.value = false
    return Promise.reject(err)
  }
  isLoading.value = false
  return result
})

useSeoMeta({
  title: 'curriculum-vitae',
  description: 'curriculum-vitae',
  keywords: 'curriculum-vitae',
  ogTitle: 'curriculum-vitae',
  ogDescription: 'curriculum-vitae',
})

const targetCategory = ref<string>()

const options = computed(() => {
  return categories.value.map((item) => item.route.hash.split('#')[1])
})

const router = useRouter()
watch(targetCategory, (newValue) => {
  router.push(localePath({
    name: 'home-curriculum-vitae',
    hash: categories.value.find((item) => item.route.hash.split('#')[1] === targetCategory.value)?.route.hash,
  }))
})

onMounted(() => {
  targetCategory.value = currentCategory.value
})

watch(currentCategory, (newValue) => {
  targetCategory.value = newValue
})

function checkActiveStyle(category: string) {
  if (targetCategory.value === category.replace('#', '')) {
    return 'bg-accent'
  }
  return ''
}
</script>

<style scoped lang="sass">
:deep()
  table
    max-width: 100%
  ul
    list-style-type: disc !important
    padding-left: 1rem
  ol
    list-style-type: decimal-leading-zero
    padding-left: 1rem
</style>
