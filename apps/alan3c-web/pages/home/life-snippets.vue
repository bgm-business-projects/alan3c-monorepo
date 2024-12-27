<template>
  <div class="w-full flex flex-col gap-3rem items-center layout-padding py-3rem">
    <div class="max-width flex flex-col gap-2rem">
      <h1 class="text-2xl font-bold text-primary">
        生活點滴
      </h1>
    </div>
    <div class="max-width">
      {{ lifeSnippets }}
    </div>
  </div>
</template>

<script setup lang="ts">
const useLifeSnippets = useLifeSnippetsApi()

const { locale } = useI18n()

const { data: lifeSnippets, refresh: refreshLifeSnippets } = useLazyAsyncData('life-snippets', async () => {
  const result: { [key: string]: any } = {}
  const [teacherStudentSnapshotsErr, teacherStudentSnapshots] = await to (useLifeSnippets.findTeacherStudentSnapshots())
  if (teacherStudentSnapshotsErr) {
    return Promise.reject(teacherStudentSnapshotsErr)
  }
  result.teacherStudentSnapshots = teacherStudentSnapshots
  return result
}, {
  watch: [locale],
})

useSeoMeta({
  title: 'home',
  description: 'home',
  keywords: 'home',
  ogTitle: 'home',
  ogDescription: 'home',
})
</script>

<style scoped lang="sass">
.test
  background: #000
</style>
