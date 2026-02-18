<script setup lang="ts">
import { useRestaurantStore } from '@/stores/useRestaurantStore'
import { TIME_SLOTS } from '@/types/index'
import type { TimeSlot } from '@/types/index'

const store = useRestaurantStore()

function onSelect(slot: TimeSlot) {
  store.setTimeSlot(slot)
}
</script>

<template>
  <div class="time-slot-selector" role="group" aria-label="Selector de horarios">
    <h2>Selecciona un horario</h2>
    <div class="slots">
      <button
        v-for="slot in TIME_SLOTS"
        :key="slot"
        :class="{ active: store.activeTimeSlot === slot }"
        :aria-pressed="store.activeTimeSlot === slot"
        @click="onSelect(slot)"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.time-slot-selector { margin-bottom: 20px; }
h2 { font-size: 1.1em; margin-bottom: 8px; }
.slots { display: flex; gap: 8px; flex-wrap: wrap; }
button {
  padding: 8px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 1em;
}
button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
button:focus { outline: 2px solid #2563eb; outline-offset: 2px; }
</style>
