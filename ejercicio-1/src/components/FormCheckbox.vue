<script setup lang="ts">
import ErrorMessage from './ErrorMessage.vue'
import type { FieldValidation } from '@/types/reservation'

const props = defineProps<{
  label: string
  name: string
  modelValue: string[]
  options: { value: string; label: string }[]
  validation?: FieldValidation
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  change: []
}>()

function onToggle(optionValue: string) {
  const current = [...props.modelValue]
  const idx = current.indexOf(optionValue)
  if (idx >= 0) {
    current.splice(idx, 1)
  } else {
    current.push(optionValue)
  }
  emit('update:modelValue', current)
  emit('change')
}
</script>

<template>
  <fieldset class="form-group">
    <legend>{{ label }}</legend>
    <div v-for="opt in options" :key="opt.value" class="checkbox-item">
      <label :for="name + '-' + opt.value">
        <input
          type="checkbox"
          :id="name + '-' + opt.value"
          :name="name"
          :value="opt.value"
          :checked="props.modelValue.includes(opt.value)"
          @change="onToggle(opt.value)"
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
.checkbox-item { margin: 4px 0; }
.checkbox-item label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
</style>