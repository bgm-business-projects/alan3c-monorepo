<template>
  <div class="w-full flex flex-col gap-2rem items-center layout-padding">
    <div class="max-width flex flex-col gap-1.5rem bg-white fixed pt-3rem">
      <div class="w-full flex flex-col gap-2rem">
        <h1 class="text-2xl font-bold text-primary">
          Curriculum Vitae
        </h1>
      </div>
      <div class="w-full flex flex-col gap-2rem">
        <div class="flex gap-.5rem">
          <div
            v-for="category in categories" :key="category.name"
            class="bg-[#f4f4f4] px-1rem py-.2rem rounded-.5rem"
            :class="{
              'bg-accent': category.route.hash.slice(1) === currentCategory,
            }"
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
      </div>
    </div>
    <div class="max-width flex flex-col gap-4rem pt-10rem pb-1rem">
      <div id="information">
        <div v-html="curriculumVitaeData?.data.curriculumVitae" />
      </div>
      <div id="activities-society">
        <div v-html="curriculumVitaeData?.data.activitiesSociety" />
      </div>
      <div id="activities-other">
        <div v-html="curriculumVitaeData?.data.activitiesOther" />
      </div>
      <div id="technical-reviewer">
        <div v-html="curriculumVitaeData?.data.technicalReviewer" />
      </div>
      <div id="consulting">
        <div v-html="curriculumVitaeData?.data.consulting" />
      </div>
      <div id="projects">
        <div v-html="curriculumVitaeData?.data.projects" />
      </div>
      <div id="theses-master">
        <div v-html="curriculumVitaeData?.data.thesesMaster" />
      </div>
      <div id="awards">
        <div v-html="curriculumVitaeData?.data.awards" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
