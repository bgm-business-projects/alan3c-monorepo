<template>
  <div class="fixed bottom-13rem left-0 w-full pointer-events-none flex justify-center layout-padding">
    <div class="max-width w-full flex justify-end">
      <q-icon name="expand_circle_down" class="text-4xl rotate-180 pointer-events-auto cursor-pointer" @click="scrollToTop" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

function scrollToTop() {
  const queryString = new URLSearchParams(route.query as Record<string, string>).toString()
  const fullPath = queryString ? `${route.path}?${queryString}#top` : `${route.path}#top`
  router.push(fullPath)
}
</script>
