<template>
  <div class="flex flex-col items-center layout-padding">
    <slot name="header" />
    <div class="max-width py-4.5rem">
      <div class="w-full flex flex-col lg:flex-row items-start gap-1rem lg:gap-3rem py-3rem">
        <div class="flex lg:hidden overflow-scroll max-w-full">
          <div class="bg-accent relative flex flex-nowrap">
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
        <ul class="hidden lg:!flex flex-col gap-.5rem">
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
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const localePath = useLocalePath()

const { locale } = useI18n()
const data = ref([
  {
    name: '簡歷',
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'resume' },
    },
  },
  {
    name: '履歷',
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'curriculumVitae' },
    },
  },
  {
    name: '學術活動',
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'academicActivities' },
    },
  },
  {
    name: '學術榮譽',
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'academicRecognition' },
    },
  },
  {
    name: '曾任教科目',
    route: {
      name: 'home-personal-profile-id',
      params: { id: 'coursesTaught' },
    },
  },
])

// 存放每個元素的 ref
const categoryElements = ref<HTMLElement[]>([])
const categoryElementsWidth = ref<number[]>([])

onMounted(() => {
  console.log('test1')
})

watch(categoryElements, async (newValue) => {
  console.log('test')
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
