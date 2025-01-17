<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin w-full">
      <video controls class="w-full">
        <source :src="props.src" type="video/mp4">
      </video>
      <q-card-actions align="right" class="p-.7rem">
        <q-btn color="black" unelevated :label="t('closeDialog')" class="!px-1rem rounded-.6rem" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'

interface Props {
  src: string;
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits([
  ...useDialogPluginComponent.emits,
])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const { t } = useI18n()
</script>

<style lang="sass">
.q-dialog__inner--minimized
  padding: 0px 5%
.q-dialog__inner--minimized > div
  max-width: 80rem !important
.q-dialog__backdrop
  background-color: rgba(0, 0, 0, .5)
</style>
