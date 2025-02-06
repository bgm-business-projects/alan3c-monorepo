<template>
  <div class="flex flex-col items-center">
    <div id="top" />
    <slot name="header" />
    <div class="w-full py-4.5rem min-h-[calc(100dvh-197px)]">
      <slot />
    </div>
    <slot name="footer" />
    <base-scroll-to-top />
  </div>
</template>

<script lang="ts" setup>
import BaseScrollToTop from '~/components/base-scroll-to-top.vue'
</script>

<style scoped lang="sass">
</style>
