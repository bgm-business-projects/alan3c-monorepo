<template>
  <div class="layout-padding flex flex-col items-center">
    <slot name="header" />
    <div class="w-full py-4.5rem max-width">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="sass">
</style>
