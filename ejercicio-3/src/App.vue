<script setup lang="ts">
import TimeSlotSelector from './components/TimeSlotSelector.vue'
import RestaurantLayout from './components/RestaurantLayout.vue'
</script>

<template>
  <div class="app">
    <header>
      <h1>VueDining - Sistema de Reservas</h1>
    </header>
    <main>
      <TimeSlotSelector />
      <RestaurantLayout />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; line-height: 1.5; background: #f9fafb; }
.app { max-width: 900px; margin: 0 auto; padding: 20px; }
header { margin-bottom: 20px; }
h1 { font-size: 1.4em; }
</style>
