<template>
  <div class="w-full layout-padding flex justify-center">
    <div class="bg-primary w-full max-width py-2.5rem px-3rem rounded-tl-2rem rounded-tr-2rem flex flex-col gap-1rem">
      <div class="flex items-center gap-2rem justify-between">
        <div class="flex flex-row items-center gap-.5rem">
          <nuxt-img
            src="/logo.png"
            class="w-1.7rem mt-.2rem"
          />
          <div class="font-semibold">
            {{ t('webName') }}
          </div>
        </div>
        <div class="font-medium">
          {{ t('universityDepartments') }}
        </div>
      </div>
      <div class="flex gap-2rem font-medium">
        <div>
          TEL: +886-4-24517250#3791~3
        </div>
        <div>
          FAX: +886-4-27066495
        </div>
      </div>
      <div class="border-solid border-t-1px border-black" />
      <div class="font-medium">
        © 2025 BG MOTION all rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
