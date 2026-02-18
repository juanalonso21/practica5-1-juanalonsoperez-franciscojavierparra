<script setup lang="ts">
import TableMap from './TableMap.vue'
import ReservationForm from './ReservationForm.vue'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

const store = useRestaurantStore()
</script>

<template>
  <div class="restaurant-layout">
    <TableMap />
    <ReservationForm
      v-if="store.selectedTable && store.isTableAvailable(store.selectedTable.id)"
      :selected-table="store.selectedTable"
    />
    <p v-else-if="store.selectedTableId && !store.isTableAvailable(store.selectedTableId)" class="occupied-msg">
      Esta mesa está ocupada en este horario.
    </p>
  </div>
</template>

<style scoped>
.restaurant-layout { flex: 1; }
.occupied-msg { color: #ef4444; margin-top: 12px; font-size: 0.9em; }
</style>
