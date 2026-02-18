<script setup lang="ts">
import { ref } from 'vue'
import { validateDiscountCode } from '@/services/validationService'

const props = defineProps<{
  currentCode: string
  currentPercent: number
}>()

const emit = defineEmits<{
  applied: [code: string, percent: number]
}>()

const code = ref(props.currentCode)
const loading = ref(false)
const message = ref('')
const isError = ref(false)

async function apply() {
  if (!code.value.trim()) return
  loading.value = true
  message.value = ''

  const result = await validateDiscountCode(code.value)
  loading.value = false

  if (result.valid) {
    message.value = `Descuento del ${result.percent}% aplicado`
    isError.value = false
    emit('applied', code.value, result.percent)
  } else {
    message.value = 'Código de descuento inválido'
    isError.value = true
  }
}
</script>

<template>
  <div class="discount-code">
    <label for="discount">Código de descuento</label>
    <div class="discount-row">
      <input
        id="discount"
        type="text"
        v-model="code"
        placeholder="Ej: BIENVENIDO10"
        :disabled="loading"
      />
      <button type="button" @click="apply" :disabled="loading" class="btn-apply">
        {{ loading ? '...' : 'Aplicar' }}
      </button>
    </div>
    <span v-if="message" :class="{ success: !isError, error: isError }">{{ message }}</span>
  </div>
</template>

<style scoped>
.discount-code { margin: 12px 0; }
label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 0.9em; }
.discount-row { display: flex; gap: 8px; }
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn-apply {
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-apply:disabled { opacity: 0.5; }
.success { color: green; font-size: 0.85em; }
.error { color: red; font-size: 0.85em; }
</style>
