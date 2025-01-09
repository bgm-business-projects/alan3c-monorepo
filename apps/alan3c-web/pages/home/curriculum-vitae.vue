<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding py-3rem border-solid">
    <div class="flex flex-col gap-1.5rem bg-white max-width">
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
    <div class="max-width flex flex-col pb-1rem overflow-hidden w-full">
      <div id="information" class="w-full">
        <div class="w-full" v-html="curriculumVitaeData?.data.curriculumVitae" />
      </div>
      <div id="activities-society" class="w-full">
        <div class="w-full" v-html="curriculumVitaeData?.data.activitiesSociety" />
      </div>
      <div id="activities-other" class="w-full">
        <div class="w-full" v-html="curriculumVitaeData?.data.activitiesOther" />
      </div>
      <div id="technical-reviewer" class="w-full">
        <div class="w-full" v-html="curriculumVitaeData?.data.technicalReviewer" />
      </div>
      <div id="consulting" class="w-full">
        <div class="w-full" v-html="curriculumVitaeData?.data.consulting" />
      </div>

      <div id="projects" class="w-full">
        <div class="w-full overflow-scroll" v-html="curriculumVitaeData?.data.projects" />
      </div>
      <div id="theses-master" class="max-width">
        <div class="w-full" v-html="curriculumVitaeData?.data.thesesMaster" />
      </div>

      <div id="awards" class="w-full">
        <div class="w-full" v-html="curriculumVitaeData?.data.awards" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurriculumVitaeDataApi } from '../../composables/use-curriculum-vitae-data-api'

const localePath = useLocalePath()
const route = useRoute()

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

const { data: curriculumVitaeData, refresh: refreshCurriculumVitaeData } = useLazyAsyncData('curriculum-vitae', async () => {
  const [err, result] = await to (useCurriculumVitaeData.findList())
  if (err) {
    return Promise.reject(err)
  }
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
</style>
