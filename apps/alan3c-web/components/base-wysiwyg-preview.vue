<template>
  <div class="wysiwyg-preview" v-html="props.htmlCode" />
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
