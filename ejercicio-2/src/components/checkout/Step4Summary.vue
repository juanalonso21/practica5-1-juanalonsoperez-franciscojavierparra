<script setup lang="ts">
import { ref } from 'vue'
import OrderSummary from '@/components/common/OrderSummary.vue'
import type { BillingData, ShippingData, CartItem } from '@/types/checkout'
import type { PaymentData } from '@/types/payment'
import { maskCardNumber, formatPrice } from '@/utils/formatters'

const props = defineProps<{
  billing: BillingData
  shipping: ShippingData
  payment: PaymentData
  cart: CartItem[]
  subtotal: number
  shippingCost: number
  discountAmount: number
  discountPercent: number
  total: number
}>()

const emit = defineEmits<{
  confirm: []
}>()

const termsAccepted = ref(false)
const privacyAccepted = ref(false)
const newsletterOptIn = ref(false)

const canConfirm = ref(false)

function checkCanConfirm() {
  canConfirm.value = termsAccepted.value && privacyAccepted.value
}

function onConfirm() {
  if (canConfirm.value) {
    emit('confirm')
  }
}

function paymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    card: 'Tarjeta de crédito',
    paypal: 'PayPal',
    transfer: 'Transferencia bancaria',
    bizum: 'Bizum',
  }
  return labels[method] || method
}

defineExpose({ confirm: onConfirm, canConfirm })
</script>

<template>
  <div>
    <h2>Resumen y confirmación</h2>

    <!-- Datos de facturación -->
    <div class="section">
      <h3>Facturación</h3>
      <p>{{ billing.fullName }}</p>
      <p>{{ billing.address }}, {{ billing.postalCode }} {{ billing.city }}</p>
      <p>{{ billing.email }} · {{ billing.phone }}</p>
    </div>

    <!-- Dirección de envío -->
    <div class="section">
      <h3>Envío</h3>
      <template v-if="shipping.sameAsBilling">
        <p>Misma dirección que facturación</p>
      </template>
      <template v-else>
        <p>{{ shipping.recipientName }}</p>
        <p>{{ shipping.address }}, {{ shipping.postalCode }} {{ shipping.city }}</p>
      </template>
    </div>

    <!-- Método de pago -->
    <div class="section">
      <h3>Pago</h3>
      <p>{{ paymentMethodLabel(payment.method) }}</p>
      <p v-if="payment.method === 'card'">{{ maskCardNumber(payment.card.cardNumber) }}</p>
    </div>

    <!-- Resumen del pedido -->
    <OrderSummary
      :cart="cart"
      :subtotal="subtotal"
      :shipping-cost="shippingCost"
      :discount-amount="discountAmount"
      :discount-percent="discountPercent"
      :total="total"
    />

    <!-- Checkboxes de confirmación -->
    <div class="confirmations">
      <label>
        <input type="checkbox" v-model="termsAccepted" @change="checkCanConfirm" />
        He leído y acepto los términos y condiciones
      </label>
      <label>
        <input type="checkbox" v-model="privacyAccepted" @change="checkCanConfirm" />
        He leído la política de privacidad
      </label>
      <label>
        <input type="checkbox" v-model="newsletterOptIn" />
        Deseo recibir ofertas y novedades
      </label>
    </div>
  </div>
</template>

<style scoped>
h2 { margin-bottom: 16px; font-size: 1.2em; }
h3 { font-size: 1em; margin-bottom: 4px; color: #374151; }
.section {
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9em;
}
.section p { margin: 2px 0; }
.confirmations {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.confirmations label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9em;
}
</style>
