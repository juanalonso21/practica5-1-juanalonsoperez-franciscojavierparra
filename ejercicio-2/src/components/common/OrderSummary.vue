<script setup lang="ts">
import type { CartItem } from '@/types/checkout'
import { formatPrice } from '@/utils/formatters'

defineProps<{
  cart: CartItem[]
  subtotal: number
  shippingCost: number
  discountAmount: number
  total: number
  discountPercent: number
}>()
</script>

<template>
  <div class="order-summary">
    <h3>Resumen del pedido</h3>
    <ul class="cart-items">
      <li v-for="item in cart" :key="item.id">
        <span>{{ item.name }} x{{ item.quantity }}</span>
        <span>{{ formatPrice(item.price * item.quantity) }}</span>
      </li>
    </ul>
    <hr />
    <div class="summary-line">
      <span>Subtotal</span>
      <span>{{ formatPrice(subtotal) }}</span>
    </div>
    <div v-if="discountPercent > 0" class="summary-line discount">
      <span>Descuento ({{ discountPercent }}%)</span>
      <span>-{{ formatPrice(discountAmount) }}</span>
    </div>
    <div class="summary-line">
      <span>Gastos de envío</span>
      <span>{{ formatPrice(shippingCost) }}</span>
    </div>
    <hr />
    <div class="summary-line total">
      <span>Total</span>
      <span>{{ formatPrice(total) }}</span>
    </div>
  </div>
</template>

<style scoped>
.order-summary {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #f9fafb;
}
h3 { margin: 0 0 12px; font-size: 1.1em; }
.cart-items { list-style: none; padding: 0; }
.cart-items li {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 0.9em;
}
hr { border: none; border-top: 1px solid #e5e7eb; margin: 8px 0; }
.summary-line {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
  font-size: 0.9em;
}
.discount { color: green; }
.total { font-weight: 700; font-size: 1.1em; }
</style>
