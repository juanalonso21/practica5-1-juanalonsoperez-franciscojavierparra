<script setup lang="ts">
import { ref } from 'vue'
import type { Table, Reservation } from '@/types/index'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

const props = defineProps<{
  table: Table
  reservation: Reservation
}>()

const store = useRestaurantStore()
const showModal = ref(false)

function confirmCancel() {
  store.cancelReservation(props.reservation.id)
  showModal.value = false
}
</script>

<template>
  <div style="padding:16px; border:2px solid #ef4444; border-radius:8px; background:#fff; margin-top:16px;">
    <!-- Cabecera -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <h2 style="font-size:1.1em; margin:0; color:#b91c1c;"> {{ table.label }} — Reservada</h2>
      <button style="background:none; border:none; font-size:1.1em; cursor:pointer; color:#6b7280; padding:2px 6px;" @click="store.clearViewingTable()">✕</button>
    </div>

    <p style="font-size:0.9em; color:#555; margin-bottom:12px;"> Horario: <strong>{{ reservation.timeSlot }}</strong></p>

    <dl style="display:grid; grid-template-columns:130px 1fr; gap:6px 12px; margin:0 0 16px;">
      <dt style="font-weight:600; font-size:0.9em;"> Nombre</dt>
      <dd style="margin:0; font-size:0.9em;">{{ reservation.customerName }}</dd>
      <dt style="font-weight:600; font-size:0.9em;"> Email</dt>
      <dd style="margin:0; font-size:0.9em;">{{ reservation.customerEmail }}</dd>
      <dt style="font-weight:600; font-size:0.9em;"> Comensales</dt>
      <dd style="margin:0; font-size:0.9em;">{{ reservation.peopleCount }} / {{ table.capacity }}</dd>
    </dl>

    <div style="display:flex; gap:10px;">
      <button
        style="padding:8px 18px; background:#ef4444; color:white; border:none; border-radius:4px; cursor:pointer; font-size:0.9em; font-weight:500;"
        @click="showModal = true"
      >
         Cancelar reserva
      </button>
      <button
        style="padding:8px 18px; background:#e5e7eb; border:none; border-radius:4px; cursor:pointer; font-size:0.9em;"
        @click="store.clearViewingTable()"
      >
        Cerrar
      </button>
    </div>
  </div>

  <!-- Modal de confirmación -->
  <Teleport to="body">
    <div v-if="showModal" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;">
      <div style="background:#fff; border-radius:10px; padding:28px 32px; max-width:380px; width:90%; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 8px; font-size:1.1em; color:#111;"> Cancelar reserva</h3>
        <p style="margin:0 0 20px; font-size:0.9em; color:#555; line-height:1.5;">
          ¿Seguro que quieres cancelar la reserva de
          <strong>{{ reservation.customerName }}</strong> para
          <strong>{{ table.label }}</strong>?
        </p>
        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button
            style="padding:8px 20px; background:#e5e7eb; border:none; border-radius:6px; cursor:pointer; font-size:0.9em;"
            @click="showModal = false"
          >
            No, mantener
          </button>
          <button
            style="padding:8px 20px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-size:0.9em; font-weight:500;"
            @click="confirmCancel"
          >
            Sí, cancelar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
