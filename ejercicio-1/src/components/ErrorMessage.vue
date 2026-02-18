<script setup lang="ts">
import type { FieldValidation } from '@/types/reservation'

defineProps<{
  validation?: FieldValidation
}>()
</script>

<template>
  <div v-if="validation?.touched" class="validation-msg">
    <span v-if="validation.isValid" class="valid">✓</span>
    <span v-else class="invalid">✗ {{ validation.message }}</span>
  </div>
</template>

<style scoped>
.validation-msg {
  font-size: 0.85em;
  margin-top: 2px;
}
.valid { color: green; }
.invalid { color: red; }
</style>