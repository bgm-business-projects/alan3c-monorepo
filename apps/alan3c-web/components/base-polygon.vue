<template>
  <svg :width="props.containerWidth" :height="props.containerHeight" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path ref="pathRef" :d="initialPath" fill="#FFA500" />
  </svg>
</template>

<script lang="ts" setup>
import anime from 'animejs'
import { computed, ref, watch } from 'vue'

interface Props {
  containerWidth?: number;
  containerHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  containerWidth: 378,
  containerHeight: 277,
})

const viewBox = computed(() => `0 0 ${props.containerWidth} ${props.containerHeight}`)

const initialPath = ref('')
const pathRef = ref<SVGPathElement>()

// 動態生成初始路徑
function generateInitialPath(width: number, height: number): string {
  const points = [
    { x: width * 0.9, y: height * 0.3 },
    { x: width * 0.8, y: height * 0.1 },
    { x: width * 0.5, y: 0 },
    { x: width * 0.3, y: height * 0.4 },
    { x: 0, y: height * 0.5 },
    { x: width * 0.1, y: height * 0.9 },
    { x: width * 0.7, y: height * 0.8 },
  ]

  const pathCommands = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`)
  pathCommands.push('Z') // 關閉路徑

  return pathCommands.join(' ')
}

// 隨機生成凸多邊形
function generateConvexPolygon(basePoints: { x: number; y: number }[], offset: number = 30) {
  const randomPoints = basePoints.map((point) => ({
    x: Math.max(0, Math.min(props.containerWidth, point.x + (Math.random() * offset - offset / 2))),
    y: Math.max(0, Math.min(props.containerHeight, point.y + (Math.random() * offset - offset / 2))),
  }))

  const pathCommands = randomPoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`)
  pathCommands.push('Z') // 關閉路徑

  return pathCommands.join(' ')
}

// 解析 path 函數
function parsePathToPoints(d: string) {
  const commands = d.match(/[a-z][^a-z]*/gi) || []
  const points: { x: number; y: number }[] = []

  commands.forEach((command) => {
    const type = command[0]

    if (type === 'Z')
      return // 忽略閉合指令

    const coords = command
      .slice(1)
      .trim()
      .split(/\s+|,/)
      .map((coord) => Number.parseFloat(coord))

    if (type === 'M' || type === 'L') {
      if (coords.length >= 2)
        points.push({ x: coords[0], y: coords[1] })
    }
  })

  return points
}

// 動態更新初始路徑
const stop = watch([() => props.containerWidth, () => props.containerHeight], async ([newWidth, newHeight]) => {
  if (newWidth === 0 || newHeight === 0)
    return

  initialPath.value = generateInitialPath(newWidth, newHeight)
  await nextTick()
  const createAnimation = () => {
    const basePoints = parsePathToPoints(initialPath.value)
    const newPath = generateConvexPolygon(basePoints, 100)
    anime({
      targets: pathRef.value,
      d: [{ value: newPath }],
      easing: 'easeInOutQuad',
      duration: 6000,
      loop: false,
      direction: 'alternate',
      complete: createAnimation,
    })
  }

  createAnimation()
  stop()
})

// onMounted(() => {
//   // 設置初始路徑
//   if (pathRef.value && initialPath.value) {

//   }
// })
</script>
