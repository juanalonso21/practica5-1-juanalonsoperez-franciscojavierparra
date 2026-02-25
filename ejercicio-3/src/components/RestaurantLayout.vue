<script setup lang="ts">
import TableMap from './TableMap.vue'
import ReservationForm from './ReservationForm.vue'
import ReservationDetail from './ReservationDetail.vue'
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
    <ReservationDetail
      v-else-if="store.viewingTable && store.viewingReservation"
      :table="store.viewingTable"
      :reservation="store.viewingReservation"
    />
  </div>
</template>

<style scoped>
.restaurant-layout { flex: 1; }
</style>
