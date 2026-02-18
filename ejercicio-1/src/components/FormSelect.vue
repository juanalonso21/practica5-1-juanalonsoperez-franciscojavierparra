<script setup lang="ts">
import ErrorMessage from './ErrorMessage.vue'
import type { FieldValidation } from '@/types/reservation'

defineProps<{
  label: string
  name: string
  modelValue: string
  options: { value: string; label: string }[]
  validation?: FieldValidation
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
  change: []
}>()

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
  emit('change')
}
</script>

<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <select
      :id="name"
      :name="name"
      :value="modelValue"
      :class="{ 'input-valid': validation?.touched && validation?.isValid, 'input-invalid': validation?.touched && !validation?.isValid }"
      :aria-invalid="validation?.touched && !validation?.isValid"
      @change="onChange"
      @blur="emit('blur')"
    >
      <option value="" disabled>-- Selecciona --</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <ErrorMessage :validation="validation" />
  </div>
</template>

<style scoped>
.form-group { margin-bottom: 12px; }
label { display: block; margin-bottom: 4px; font-weight: 500; }
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.input-valid { border-color: green; }
.input-invalid { border-color: red; }
</style>