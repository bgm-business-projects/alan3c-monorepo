<template>
  <div class="flex flex-col items-center">
    <slot name="header" />
    <div class="w-full py-4.5rem">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="sass">
</style>
