<script setup lang="ts">
import TableComponent from './TableComponent.vue'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

const store = useRestaurantStore()

function onTableSelect(tableId: number) {
  store.selectTable(tableId)
}

function onTableView(tableId: number) {
  store.viewOccupiedTable(tableId)
}
</script>

<template>
  <div class="table-map" role="group" aria-label="Mapa de mesas del restaurante">
    <h2>Planta del restaurante</h2>
    <div class="map-container">
      <TableComponent
        v-for="table in store.tablesWithStatus"
        :key="table.id"
        :table-data="table"
        @select="onTableSelect"
        @view="onTableView"
      />
    </div>
    <div class="legend">
      <span class="legend-item"><span class="dot free"></span> Libre</span>
      <span class="legend-item"><span class="dot occupied"></span> Ocupada</span>
      <span class="legend-item"><span class="dot selected"></span> Seleccionada</span>
    </div>
  </div>
</template>

<style scoped>
h2 { font-size: 1.1em; margin-bottom: 8px; }
.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
}
.legend { display: flex; gap: 16px; margin-top: 8px; font-size: 0.85em; }
.legend-item { display: flex; align-items: center; gap: 4px; }
.dot { width: 12px; height: 12px; border-radius: 3px; }
.dot.free { background: #d1fae5; border: 1px solid #22c55e; }
.dot.occupied { background: #fee2e2; border: 1px solid #ef4444; }
.dot.selected { background: #dbeafe; border: 1px solid #2563eb; }
</style>
