<template>
  <div class="w-full flex flex-col items-center gap-3rem layout-padding py-3rem">
    <div class="max-width">
      <ul class="flex flex-col gap-.5rem">
        <li v-for="(category, index) in data" :key="index">
          <nuxt-link :to="category.route" class="font-semibold tracking-.05rem">
            {{ category.name }}
          </nuxt-link>
        </li>
      </ul>
      <div />
    </div>
    <!-- <div>test</div> -->
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const data = ref([
  {
    name: '簡歷',
    route: {
      name: 'home-personal-profile',
      query: {
        category: 'resume',
      },
    },
  },
  {
    name: '履歷',
    route: {
      name: 'home-personal-profile',
      query: {
        category: 'curriculumVitae',
      },
    },
  },
  {
    name: '學術活動',
    route: {
      name: 'home-personal-profile',
      query: {
        category: 'academicActivities',
      },
    },
  },
  {
    name: '學術榮譽',
    route: {
      name: 'home-personal-profile',
      query: {
        category: 'academicRecognition',
      },
    },
  },
  {
    name: '曾任教科目',
    route: {
      name: 'home-personal-profile',
      query: {
        category: 'coursesTaught',
      },
    },
  },
])

const { data: resume, refresh: refreshResume } = useLazyAsyncData('resume', async () => {

}, {
  watch: [locale],
})

useSeoMeta({
  title: '個人資料',
  description: '個人資料',
  keywords: '個人資料',
  ogTitle: '個人資料',
  ogDescription: '個人資料',
})
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
