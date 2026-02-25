<script setup lang="ts">
import type { Table as TableType, TableStatus } from '@/types/index'

const props = defineProps<{
  tableData: TableType & { status: TableStatus }
}>()

const emit = defineEmits<{
  select: [tableId: number]
  view: [tableId: number]
}>()

function statusClass(): string {
  return props.tableData.status
}

function ariaLabel(): string {
  const statusLabels: Record<TableStatus, string> = {
    free: 'Libre',
    occupied: 'Ocupada',
    selected: 'Seleccionada',
  }
  return `${props.tableData.label}, para ${props.tableData.capacity} personas, estado: ${statusLabels[props.tableData.status]}`
}
</script>

<template>
  <button
    class="table-btn"
    :class="statusClass()"
    :aria-label="ariaLabel()"
    @click="tableData.status === 'occupied' ? emit('view', tableData.id) : emit('select', tableData.id)"
    :style="{
      left: tableData.position.x + '%',
      top: tableData.position.y + '%',
    }"
  >
    <span class="table-label">{{ tableData.label }}</span>
    <span class="table-capacity">{{ tableData.capacity }}p</span>
  </button>
</template>

<style scoped>
.table-btn {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: 2px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  transition: transform 0.1s;
}
.table-btn:focus { outline: 3px solid #2563eb; outline-offset: 2px; }
.table-btn:hover:not(:disabled) { transform: scale(1.05); }
.free { background: #d1fae5; border-color: #22c55e; }
.occupied { background: #fee2e2; border-color: #ef4444; cursor: pointer; opacity: 0.9; }
.selected { background: #dbeafe; border-color: #2563eb; }
.table-label { font-weight: 600; }
.table-capacity { font-size: 0.75em; color: #666; }
</style>
