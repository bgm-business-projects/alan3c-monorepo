<template>
  <div class="flex flex-col items-center layout-padding">
    <div id="top" />
    <slot name="header" />
    <div class="max-width py-4.5rem min-h-[calc(100dvh-197px)]">
      <div class="flex max-width py-1.5rem sm:py-3rem">
        <base-breadcrumbs
          :bread-list="[
            {
              name: t('navbar.home'),
              route: {
                name: 'home',
              },
            },
            {
              name: t('home.biography'),
              route: {
                name: 'home-personal-profile-id',
                params: {
                  id: route.params.id as string,
                },
              },
            },
          ]"
        />
      </div>
      <div class="w-full flex flex-col sm:flex-row items-start gap-1rem sm:gap-3rem">
        <!-- mobile -->
        <div class="scrollable sm:hidden max-w-full w-full">
          <div class="bg-accent relative flex flex-nowrap min-w-max">
            <nuxt-link
              v-for="(category, index) in data"
              ref="categoryElements"
              :key="index"
              :to="localePath(category.route)"
              class="flex text-md font-medium tracking-.05rem hover:text-primary duration-300 px-1rem py-.5rem whitespace-nowrap"
            >
              <div>{{ category.name }}</div>
            </nuxt-link>
            <div class="absolute bottom-0 border-primary border-1px border-solid duration-300" :style="bottomLineStyle" />
          </div>
        </div>
        <!-- desktop -->
        <ul class="hidden sm:!flex flex-col gap-.5rem">
          <li v-for="(category, index) in data" :key="index">
            <nuxt-link
              :to="category.route"
              class="text-md font-medium tracking-.05rem hover:text-primary duration-300"
              :class="route.params.id === category.route.params.id ? 'text-primary' : ''"
            >
              {{ category.name }}
            </nuxt-link>
          </li>
        </ul>
        <nuxt-page />
      </div>
    </div>
    <slot name="footer" />
    <base-scroll-to-top />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const localePath = useLocalePath()

const { t } = useI18n()
const data = computed(() => [
  {
    name: t('biography.resume'),
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'resume' },
    },
  },
  {
    name: t('biography.curriculumVitae'),
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'curriculumVitae' },
    },
  },
  {
    name: t('biography.academicActivities'),
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'academicActivities' },
    },
  },
  {
    name: t('biography.academicRecognition'),
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'academicRecognition' },
    },
  },
  {
    name: t('biography.coursesTaught'),
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'coursesTaught' },
    },
  },
  {
    name: t('biography.patentApplication'),
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'patentApplication' },
    },
  },
])

// 存放每個元素的 ref
const categoryElements = ref<HTMLElement[]>([])
const categoryElementsWidth = ref<number[]>([])

watch(categoryElements, async (newValue) => {
  await nextTick()
  categoryElementsWidth.value = newValue.map((el) => {
    if (el) {
      const { width } = useElementSize(el)
      return width.value
    }
    return 0 // 預設為 0，避免 null 的情況
  })
}, { immediate: true, deep: true })

const bottomLineStyle = computed(() => {
  const index = data.value.findIndex((item) => item.route.params.id === route.params.id)
  if (index === 0) {
    return {
      left: 0,
      width: `${categoryElementsWidth.value[index]}px`,
    }
  }
  else {
    const left = categoryElementsWidth.value.slice(0, index).reduce((acc, curr) => acc + curr, 0)
    return {
      left: `${left}px`,
      width: `${categoryElementsWidth.value[index]}px`,
    }
  }
})

watch(bottomLineStyle, (newValue, oldValue) => {
  console.log(oldValue, newValue)
}, {
  immediate: true,
  deep: true,
})
</script>

<style lang="sass" scoped>
.scrollable
  overflow-x: auto  /* 保留水平滾動 */
  overflow-y: hidden /* 隱藏垂直滾動 */
</style>
