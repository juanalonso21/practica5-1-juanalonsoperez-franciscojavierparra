<script setup lang="ts">
defineProps<{
  disableNext?: boolean
  showPrev?: boolean
  showNext?: boolean
  showSubmit?: boolean
  showSaveDraft?: boolean
  nextLabel?: string
}>()

const emit = defineEmits<{
  next: []
  prev: []
  submit: []
  saveDraft: []
}>()
</script>

<template>
  <div class="navigation-buttons">
    <button v-if="showPrev" type="button" class="btn btn-secondary" @click="emit('prev')">
      ← Anterior
    </button>
    <button v-if="showSaveDraft" type="button" class="btn btn-outline" @click="emit('saveDraft')">
      Guardar borrador
    </button>
    <button
      v-if="showNext"
      type="button"
      class="btn btn-primary"
      :disabled="disableNext"
      @click="emit('next')"
    >
      {{ nextLabel || 'Siguiente →' }}
    </button>
    <button
      v-if="showSubmit"
      type="button"
      class="btn btn-success"
      :disabled="disableNext"
      @click="emit('submit')"
    >
      Confirmar pedido
    </button>
  </div>
</template>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95em;
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: #2563eb; color: white; }
.btn-secondary { background: #6b7280; color: white; }
.btn-success { background: #22c55e; color: white; }
.btn-outline { background: transparent; border: 1px solid #ccc; }
</style>
