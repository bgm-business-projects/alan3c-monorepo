<template>
  <div class="flex md:gap-2rem w-full flex-col md:flex-row border-[#f4f4f4] border-2px border-solid rounded-1rem overflow-hidden">
    <div class="w-full md:w-150px aspect-[5/6] flex justify-center items-center overflow-hidden">
      <nuxt-img
        v-if="props.data.image?.filename_disk"
        class="min-w-full min-h-full object-cover w-full"
        :src="combineImageUrl(props.data.image.filename_disk)"
      />
      <div v-else class="min-w-full min-h-full object-cover bg-[#f4f4f4]" />
    </div>
    <div class="flex flex-1 p-1.5rem flex-col gap-1rem md:flex-row">
      <div class="flex flex-col justify-center gap-.5rem flex-1">
        <h3 class="font-bold text-lg">
          {{ props.data.translations.title }}
        </h3>
        <div v-if="props.data.translations?.coAuthor">
          {{ t('authoredBooks.coAuthor') }} : {{ props.data.translations.coAuthor }}
        </div>
      </div>
      <div class="flex flex-col justify-center gap-.5rem flex-1">
        <p>
          {{ props.data.translations?.company }}
        </p>
        <p>
          {{ props.data.date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthoredBooks } from '~/contract/bibliography/authored-books.type'
import type { NormalizeTranslations } from '~/contract/utils/translation.type'
import { combineImageUrl } from '~/utils/combine-image-url'

const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { t } = useI18n()

const { locale } = useI18n()

interface Props {
  data: NormalizeTranslations<AuthoredBooks['data'][number]>;
}
</script>

<style scoped lang="sass">
</style>
