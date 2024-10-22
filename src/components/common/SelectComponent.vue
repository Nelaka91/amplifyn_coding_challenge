<template>
  <div class="select-wrapper">
    <v-select
      class="select-input"
      :options="data"
      :modelValue="modelValue"
      @update:modelValue="updateValue"
      :clearable="false"
      placeholder="Select"
    />
  </div>
</template>

<script lang="ts" setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { defineProps, defineEmits } from 'vue'

defineProps({
  data: Array<string>,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.select-wrapper {
  margin-top: 8px;
  margin-bottom: 24px;
  --vs-border-radius: 8px;
}
::v-deep(.select-input .vs__dropdown-toggle) {
  padding: 11px 12px;
}
</style>
