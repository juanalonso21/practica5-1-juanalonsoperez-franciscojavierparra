<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
}>()

const stepLabels = ['Facturación', 'Envío', 'Pago', 'Confirmación']
</script>

<template>
  <div class="step-indicator" role="navigation" aria-label="Pasos del checkout">
    <div
      v-for="(label, i) in stepLabels"
      :key="i"
      class="step"
      :class="{
        active: currentStep === i + 1,
        completed: currentStep > i + 1,
      }"
      :aria-current="currentStep === i + 1 ? 'step' : undefined"
    >
      <span class="step-number">
        <template v-if="currentStep > i + 1">✓</template>
        <template v-else>{{ i + 1 }}</template>
      </span>
      <span class="step-label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 0 10px;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  opacity: 0.5;
}
.step.active { opacity: 1; font-weight: 600; }
.step.completed { opacity: 0.8; }
.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  font-size: 0.9em;
}
.step.active .step-number { background: #2563eb; color: white; }
.step.completed .step-number { background: #22c55e; color: white; }
.step-label { font-size: 0.8em; text-align: center; }
</style>
