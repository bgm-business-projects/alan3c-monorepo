<template>
  <slot :bind="bind" />
</template>

<script lang="ts" setup>
const el = ref<Element>()
function bind(ref: Element | null | ComponentPublicInstance) {
  if (!(ref instanceof Element))
    return
  el.value = ref
}
</script>
