<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Table } from '@/types/index'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

const props = defineProps<{
  selectedTable: Table
}>()

const store = useRestaurantStore()

const customerName = ref('')
const customerEmail = ref('')
const peopleCount = ref(1)
const errorMessage = ref('')
const successMessage = ref('')

const maxPeople = computed(() => props.selectedTable.capacity)

function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!customerName.value.trim()) {
    errorMessage.value = 'El nombre es obligatorio'
    return
  }
  if (!customerEmail.value.trim()) {
    errorMessage.value = 'El email es obligatorio'
    return
  }
  if (peopleCount.value < 1 || peopleCount.value > maxPeople.value) {
    errorMessage.value = `El número de comensales debe ser entre 1 y ${maxPeople.value}`
    return
  }

  const success = store.addReservation({
    tableId: props.selectedTable.id,
    timeSlot: store.activeTimeSlot,
    customerName: customerName.value,
    customerEmail: customerEmail.value,
    peopleCount: peopleCount.value,
  })

  if (success) {
    successMessage.value = '¡Reserva confirmada!'
    customerName.value = ''
    customerEmail.value = ''
    peopleCount.value = 1
  } else {
    errorMessage.value = 'No se pudo realizar la reserva. La mesa puede estar ya ocupada.'
  }
}
</script>

<template>
  <div class="reservation-form">
    <h2>Reservar {{ selectedTable.label }}</h2>
    <p class="info">Capacidad: {{ selectedTable.capacity }} personas · Horario: {{ store.activeTimeSlot }}</p>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="customerName">Nombre *</label>
        <input id="customerName" type="text" v-model="customerName" required />
      </div>

      <div class="field">
        <label for="customerEmail">Email *</label>
        <input id="customerEmail" type="email" v-model="customerEmail" required />
      </div>

      <div class="field">
        <label for="peopleCount">Comensales (máx. {{ maxPeople }})</label>
        <input
          id="peopleCount"
          type="number"
          v-model.number="peopleCount"
          :min="1"
          :max="maxPeople"
          required
        />
      </div>

      <div v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success" role="status">{{ successMessage }}</div>

      <button type="submit" class="btn-submit">Confirmar reserva</button>
      <button type="button" class="btn-cancel" @click="store.deselectTable()">Cancelar</button>
    </form>
  </div>
</template>

<style scoped>
.reservation-form {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  margin-top: 16px;
}
h2 { font-size: 1.1em; margin-bottom: 4px; }
.info { font-size: 0.85em; color: #666; margin-bottom: 12px; }
.field { margin-bottom: 10px; }
label { display: block; margin-bottom: 2px; font-weight: 500; font-size: 0.9em; }
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.error { color: red; font-size: 0.85em; margin-bottom: 8px; }
.success { color: green; font-size: 0.85em; margin-bottom: 8px; }
.btn-submit {
  padding: 8px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}
.btn-cancel {
  padding: 8px 20px;
  background: #e5e7eb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
