<script setup lang="ts">
import ErrorMessage from './ErrorMessage.vue'
import type { FieldValidation } from '@/types/reservation'

const props = defineProps<{
  label: string
  name: string
  modelValue: string
  options: { value: string; label: string }[]
  validation?: FieldValidation
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: []
}>()

function onSelect(optionValue: string) {
  emit('update:modelValue', optionValue)
  emit('change')
}
</script>

<template>
  <fieldset class="form-group">
    <legend>{{ label }}</legend>
    <div v-for="opt in options" :key="opt.value" class="radio-item">
      <label :for="name + '-' + opt.value">
        <input
          type="radio"
          :id="name + '-' + opt.value"
          :name="name"
          :value="opt.value"
          :checked="props.modelValue === opt.value"
          @change="onSelect(opt.value)"
        />
        {{ opt.label }}
      </label>
    </div>
    <ErrorMessage :validation="validation" />
  </fieldset>
</template>

<style scoped>
.form-group { margin-bottom: 12px; border: none; padding: 0; }
legend { font-weight: 500; margin-bottom: 4px; }
.radio-item { margin: 4px 0; }
.radio-item label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
</style>