<template>
  <nuxt-layout>
    <template #header>
      <the-header />
    </template>
    <template #default>
      <div>
        <nuxt-page />
      </div>
    </template>
    <template #footer>
      <the-footer />
    </template>
  </nuxt-layout>
</template>

<script setup lang="ts">
import TheFooter from './components/the-footer.vue'
import TheHeader from './components/the-header.vue'

const config = useRuntimeConfig()

// 直接覆蓋 `config.public.apiBaseUrl`
if (import.meta.server) {
  config.public.apiBaseUrl = config.public.apiBaseSSRUrl // 給 SSR 用
}
else {
  config.public.apiBaseUrl = config.public.apiBaseCSRUrl // 給 CSR 用
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=Poppins:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500;1,600;1,700;1,800;1,900&display=swap')
*
  font-family: 'Noto Sans TC', sans-serif

html
  overflow-y: scroll
  scrollbar-gutter: stable
</style>
