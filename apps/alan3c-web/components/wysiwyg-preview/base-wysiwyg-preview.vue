<template>
  <div v-if="isClient" ref="shadowContainer" />
  <div v-else class="wysiwyg-preview" v-html="props.htmlCode" />
</template>

<script setup lang="ts">
import tinyMCEStyle from './tinyMCE.css?raw'

interface Props {
  htmlCode?: string | null;
}
const props = withDefaults(defineProps<Props>(), {
  htmlCode: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

// 判斷是否為客戶端環境
const isClient = import.meta.client

const shadowContainer = ref<HTMLElement>()

onMounted(() => {
  if (isClient) {
    watch(() => props.htmlCode, async () => {
      await nextTick()
      handleRenderHTML()
    }, {
      immediate: true,
    })
  }
})

function handleRenderHTML() {
  const container = shadowContainer.value
  const node = createElementFromHTML(props.htmlCode)

  if (!node)
    throw new Error('建立 Node 失敗')

  container?.childNodes.forEach((el) => {
    container.removeChild(el)
  })
  if (!container?.shadowRoot) {
    container?.attachShadow({ mode: 'open' })
  }
  if (container) {
    container.shadowRoot!.innerHTML = '' // 清空內容
    container.shadowRoot!.appendChild(node)
  }
}

function createElementFromHTML(htmlString: string | null) {
  htmlString = htmlString || '<div></div>'
  const div = document.createElement('div')
  div.innerHTML = `
  <style>
    ${tinyMCEStyle}
  </style>
  <div class="timymce-body">
    ${htmlString.trim()}
  </div>
  `
  return div
}
</script>

<style lang="sass">
.wysiwyg-preview
  all: unset // 重設 Reset 的影響，但保留繼承樣式
  all: revert // 使用瀏覽器預設樣式（更適合瀏覽器的原生標籤）

  table
    all: revert
    border: 1px solid #000
    border-collapse: collapse
    width: 100%

  th, td
    all: revert
    border: 1px solid #000
    padding: 8px
    text-align: left

  p, h1, h2, h3, h4, h5, h6
    all: revert
    margin: revert
    padding: revert

  ul, ol
    all: revert
    padding-left: 40px
    list-style: revert

  a
    all: revert
    color: blue
    text-decoration: underline
</style>
