<script setup lang="ts">
import { ref } from 'vue'
import ReservationForm from './components/ReservationForm.vue'

const darkMode = ref(false)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
}
</script>

<template>
  <div :class="{ dark: darkMode }" class="app-container">
    <header>
      <h1>Reserva de Eventos</h1>
      <button @click="toggleDarkMode" class="theme-toggle" aria-label="Cambiar tema">
        {{ darkMode ? '☀️' : '🌙' }}
      </button>
    </header>
    <main>
      <ReservationForm />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; line-height: 1.5; }
.app-container { min-height: 100vh; padding: 20px; transition: background 0.3s, color 0.3s; }
.app-container.dark { background: #1f2937; color: #f9fafb; }
.app-container.dark fieldset { border-color: #4b5563; }
.app-container.dark input, .app-container.dark select, .app-container.dark textarea { background: #374151; color: #f9fafb; border-color: #4b5563; }
.app-container.dark .summary, .app-container.dark .live-summary { background: #374151; border-color: #4b5563; }
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 20px;
}
h1 { font-size: 1.5em; }
.theme-toggle {
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 1.2em;
}
</style>
