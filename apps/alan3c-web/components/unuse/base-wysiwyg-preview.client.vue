<template>
  <div ref="shadowContainer" />
</template>

<script setup lang="ts">
interface Props {
  htmlCode?: string | null;
}
const props = withDefaults(defineProps<Props>(), {
  htmlCode: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const shadowContainer = ref<HTMLElement>()

onMounted(() => {
  watch(() => props.htmlCode, async () => {
    await nextTick()
    handleRenderHTML()
  }, {
    immediate: true,
  })
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
  htmlString = htmlString || '<div>讀取中</div>'
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div
}
</script>

<style lang="sass">
</style>
