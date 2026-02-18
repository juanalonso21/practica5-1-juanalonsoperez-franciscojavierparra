<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
  type?: string
  as?: string
  placeholder?: string
}>()

const { value, errorMessage, handleBlur, handleChange } = useField(() => props.name)
</script>

<template>
  <div class="form-field">
    <label :for="name">{{ label }}</label>
    <textarea
      v-if="as === 'textarea'"
      :id="name"
      :name="name"
      :value="value as string"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      :class="{ invalid: !!errorMessage }"
      rows="3"
    ></textarea>
    <input
      v-else
      :type="type || 'text'"
      :id="name"
      :name="name"
      :value="value as string"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      :class="{ invalid: !!errorMessage }"
      :aria-invalid="!!errorMessage"
    />
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.form-field { margin-bottom: 12px; }
label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 0.9em; }
input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.invalid { border-color: red; }
.error { color: red; font-size: 0.8em; }
</style>
