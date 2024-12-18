<template>
  <div class="bg-light-red">
    <slot name="header"></slot>
    <div class="w-full pt-3rem">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
</script>
<style scoped lang="sass">
</style>