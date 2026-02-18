<script setup lang="ts">
import { ref } from 'vue'
import StepIndicator from './StepIndicator.vue'
import NavigationButtons from './NavigationButtons.vue'
import Step1Billing from './Step1Billing.vue'
import Step2Shipping from './Step2Shipping.vue'
import Step3Payment from './Step3Payment.vue'
import Step4Summary from './Step4Summary.vue'
import OrderSummary from '@/components/common/OrderSummary.vue'
import { useCheckout } from '@/composables/useCheckout'
import { useWizardNavigation } from '@/composables/useWizardNavigation'
import { submitOrder } from '@/services/checkoutService'
import type { BillingData, ShippingData } from '@/types/checkout'
import type { PaymentData } from '@/types/payment'

const { state, subtotal, shippingCost, discountAmount, total, applyDiscount, saveDraft, clearData } =
  useCheckout()
const { currentStep, isFirstStep, isLastStep, nextStep, prevStep, totalSteps } =
  useWizardNavigation()

const step1Ref = ref<InstanceType<typeof Step1Billing>>()
const step2Ref = ref<InstanceType<typeof Step2Shipping>>()
const step3Ref = ref<InstanceType<typeof Step3Payment>>()
const step4Ref = ref<InstanceType<typeof Step4Summary>>()

const orderCompleted = ref(false)
const orderId = ref('')

async function handleNext() {
  if (currentStep.value === 1 && step1Ref.value) {
    await step1Ref.value.submit()
  } else if (currentStep.value === 2 && step2Ref.value) {
    await step2Ref.value.submit()
  } else if (currentStep.value === 3 && step3Ref.value) {
    await step3Ref.value.submit()
  }
}

function onStep1Valid(data: BillingData) {
  Object.assign(state.billing, data)
  nextStep()
}

function onStep2Valid(data: ShippingData) {
  Object.assign(state.shipping, data)
  nextStep()
}

function onStep3Valid(data: Partial<PaymentData>) {
  state.payment.method = data.method || state.payment.method
  nextStep()
}

function onDiscount(code: string, percent: number) {
  applyDiscount(code, percent)
}

async function handleConfirm() {
  const result = await submitOrder(state as never)
  if (result.success) {
    orderCompleted.value = true
    orderId.value = result.orderId
    clearData()
  }
}
</script>

<template>
  <div class="checkout-wizard">
    <!-- Pedido completado -->
    <div v-if="orderCompleted" class="order-success">
      <h2>✓ ¡Pedido confirmado!</h2>
      <p>Tu número de pedido es: <strong>{{ orderId }}</strong></p>
      <p>Recibirás un email de confirmación en breve.</p>
    </div>

    <template v-else>
      <StepIndicator :current-step="currentStep" :total-steps="totalSteps" />

      <div class="wizard-content">
        <div class="wizard-main">
          <Step1Billing
            v-if="currentStep === 1"
            ref="step1Ref"
            :billing="state.billing"
            @valid="onStep1Valid"
          />
          <Step2Shipping
            v-if="currentStep === 2"
            ref="step2Ref"
            :shipping="state.shipping"
            @valid="onStep2Valid"
          />
          <Step3Payment
            v-if="currentStep === 3"
            ref="step3Ref"
            :payment="state.payment"
            :discount-code="state.discountCode"
            :discount-percent="state.discountPercent"
            @valid="onStep3Valid"
            @discount="onDiscount"
          />
          <Step4Summary
            v-if="currentStep === 4"
            ref="step4Ref"
            :billing="state.billing"
            :shipping="state.shipping"
            :payment="state.payment"
            :cart="state.cart"
            :subtotal="subtotal"
            :shipping-cost="shippingCost"
            :discount-amount="discountAmount"
            :discount-percent="state.discountPercent"
            :total="total"
            @confirm="handleConfirm"
          />

          <NavigationButtons
            :show-prev="!isFirstStep"
            :show-next="!isLastStep"
            :show-submit="isLastStep"
            :show-save-draft="true"
            :disable-next="isLastStep && !(step4Ref?.canConfirm)"
            @next="handleNext"
            @prev="prevStep"
            @submit="handleConfirm"
            @save-draft="saveDraft"
          />
        </div>

        <aside class="wizard-sidebar">
          <OrderSummary
            :cart="state.cart"
            :subtotal="subtotal"
            :shipping-cost="shippingCost"
            :discount-amount="discountAmount"
            :discount-percent="state.discountPercent"
            :total="total"
          />
        </aside>
      </div>
    </template>
  </div>
</template>

<style scoped>
.checkout-wizard {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
.wizard-content {
  display: flex;
  gap: 24px;
}
.wizard-main { flex: 1; }
.wizard-sidebar { width: 280px; flex-shrink: 0; }
.order-success {
  text-align: center;
  padding: 40px;
}
.order-success h2 { color: #22c55e; }
@media (max-width: 768px) {
  .wizard-content { flex-direction: column; }
  .wizard-sidebar { width: 100%; }
}
</style>
