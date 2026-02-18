<script setup lang="ts">
import CheckoutWizard from './components/checkout/CheckoutWizard.vue'
</script>

<template>
  <div class="app">
    <header>
      <h1>Tienda Online - Checkout</h1>
    </header>
    <main>
      <CheckoutWizard />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; line-height: 1.5; background: #f9fafb; }
.app { min-height: 100vh; }
header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 20px;
  margin-bottom: 20px;
}
h1 { font-size: 1.3em; text-align: center; }
</style>
