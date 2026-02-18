<script setup lang="ts">
import ErrorMessage from './ErrorMessage.vue'
import type { FieldValidation } from '@/types/reservation'

defineProps<{
  label: string
  name: string
  type?: string
  modelValue: string | number
  validation?: FieldValidation
  min?: number
  max?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: []
  input: []
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input')
}
</script>

<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :type="type || 'text'"
      :id="name"
      :name="name"
      :value="modelValue"
      :min="min"
      :max="max"
      :class="{ 'input-valid': validation?.touched && validation?.isValid, 'input-invalid': validation?.touched && !validation?.isValid }"
      :aria-invalid="validation?.touched && !validation?.isValid"
      :aria-describedby="name + '-error'"
      @input="onInput"
      @blur="emit('blur')"
    />
    <ErrorMessage :validation="validation" />
  </div>
</template>

<style scoped>
.form-group { margin-bottom: 12px; }
label { display: block; margin-bottom: 4px; font-weight: 500; }
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.input-valid { border-color: green; }
.input-invalid { border-color: red; }
</style>