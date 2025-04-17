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
        <div class="hidden lg:!flex gap-[.8rem_.8rem] w-full flex-wrap ">
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
        class="w-full flex flex-col pb-1rem"
      >
        <div id="information" class="text-2xl font-semibold">
          Information
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.information" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.curriculumVitae" /> -->
        </div>

        <div id="awards" class="text-2xl font-semibold mt-3rem">
          Awards
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.awards" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.activitiesSociety" /> -->
        </div>

        <div id="society-activities" class="text-2xl font-semibold mt-3rem">
          Society Activities
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.professionalSocietyActivities" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.activitiesOther" /> -->
        </div>

        <div id="other-activities" class="text-2xl font-semibold mt-3rem">
          Other Activities
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.otherActivities" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.technicalReviewer" /> -->
        </div>

        <div id="technical-reviewer" class="text-2xl font-semibold mt-3rem">
          Technical Reviewer
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.technicalReviewer" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.consulting" /> -->
        </div>

        <div id="consulting-memberships" class="text-2xl font-semibold mt-3rem ">
          Consulting Memberships in Academic and Professional Societies
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.consultingMembershipsInAcademicAndProfessionalSocieties" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.projects" /> -->
        </div>

        <div id="project-records" class="text-2xl font-semibold mt-3rem">
          Project Records
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.projectRecords" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.thesesMaster" /> -->
        </div>

        <div id="master" class="text-2xl font-semibold mt-3rem">
          Master Theses Supervision
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.masterThesesSupervision" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.awards" /> -->
        </div>

        <div id="ph-d" class="text-2xl font-semibold mt-3rem">
          Ph. D. Dissertation Supervision
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.phDDissertationSupervision" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.awards" /> -->
        </div>

        <div id="patents" class="text-2xl font-semibold mt-3rem">
          Patents
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.patents" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.awards" /> -->
        </div>

        <div id="lecture" class="text-2xl font-semibold mt-3rem">
          Lecture
        </div>
        <div class="w-full">
          <base-wysiwyg-preview class="w-full" :html-code="curriculumVitaeData?.data.lecture" />
          <!-- <div class="w-full" v-html="curriculumVitaeData?.data.awards" /> -->
        </div>
      </div>
      <div v-else class="relative w-full h-300px">
        <q-inner-loading :showing="isLoading" />
      </div>
    </div>
    <!-- <div class="fixed bottom-200px max-width flex justify-end layout-padding lg:px-0">
      <div
        class="bg-primary w-3rem aspect-1/1 rounded-full flex justify-center items-center pb-.2rem border-white border-2px border-solid text-white font-semibold cursor-pointer"
        @click="scrollToTop()"
      >
        Top
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useAnchorScroll } from '~/.nuxt/imports'
import BaseWysiwygPreview from '~/components/wysiwyg-preview/base-wysiwyg-preview.vue'
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
      hash: '',
    },
  },
  {
    name: 'Awards',
    route: {
      name: 'home-curriculum-vitae',
      hash: decodeURIComponent('#awards'),
    },
  },
  {
    name: 'Society Activities',
    route: {
      name: 'home-curriculum-vitae',
      hash: decodeURIComponent('#society-activities'),
    },
  },
  {
    name: 'Other Activities',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#other-activities',
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
    name: 'Consulting Memberships',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#consulting-memberships ',
    },
  },
  {
    name: 'Project Records',
    route: {
      name: 'home-curriculum-vitae',
      hash: decodeURIComponent('#project-records'),
    },
  },
  {
    name: 'Master',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#master',
    },
  },
  {
    name: 'Ph. D.',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#ph-d',
    },
  },
  {
    name: 'Patents',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#patents',
    },
  },
  {
    name: 'Lecture',
    route: {
      name: 'home-curriculum-vitae',
      hash: '#lecture',
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
    list-style-position: inside
  ol
    list-style-type: decimal-leading-zero
    list-style-position: inside
</style>
