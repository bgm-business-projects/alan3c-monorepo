<template>
  <div class="flex flex-col items-center">
    <slot name="header" />
    <div class="w-full py-4.5rem min-h-[calc(100dvh-197px)]">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="sass">
</style>
