<template>
  <q-breadcrumbs class="font-medium">
    <template
      v-for="(item, index) in breadList"
      :key="item.name"
    >
      <nuxt-link
        v-if="index !== breadList.length - 1"
        :to="localePath(item.route)"
        class="hover:text-primary duration-300"
      >
        <q-breadcrumbs-el
          :label="item.name"
        />
      </nuxt-link>
      <div v-if="index !== breadList.length - 1">
        /
      </div>
      <q-breadcrumbs-el
        v-else
        :label="item.name"
        class="text-primary"
      />
    </template>
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
interface Props {
  breadList: {
    name: string;
    route: {
      name: string;
      hash?: string;
      params?: {
        id?: string;
        category?: string;
        more?: string;
      };
    };
  }[];
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const localePath = useLocalePath()
</script>
