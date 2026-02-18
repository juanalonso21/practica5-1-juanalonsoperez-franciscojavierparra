<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { getPaymentSchema } from '@/composables/useValidationSchemas'
import { detectCardType, formatCardNumber } from '@/utils/creditCard'
import FormField from '@/components/common/FormField.vue'
import DiscountCode from '@/components/common/DiscountCode.vue'
import type { PaymentData, PaymentMethod } from '@/types/payment'

const props = defineProps<{
  payment: PaymentData
  discountCode: string
  discountPercent: number
}>()

const emit = defineEmits<{
  valid: [data: Partial<PaymentData>]
  discount: [code: string, percent: number]
}>()

const method = ref<PaymentMethod>(props.payment.method)

const schema = computed(() => toTypedSchema(getPaymentSchema(method.value)))

const { handleSubmit, setFieldValue, values, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    method: method.value,
    cardNumber: props.payment.card.cardNumber,
    cardHolder: props.payment.card.cardHolder,
    expiryDate: props.payment.card.expiryDate,
    cvv: props.payment.card.cvv,
    paypalEmail: props.payment.paypal.email,
    reference: props.payment.transfer.reference,
    bizumPhone: props.payment.bizum.phone,
  },
})

const cardType = computed(() => {
  const num = (values.cardNumber || '').replace(/\s/g, '')
  return detectCardType(num)
})

const cardTypeLabel = computed(() => {
  const labels: Record<string, string> = { visa: 'Visa', mastercard: 'Mastercard', amex: 'Amex', unknown: '' }
  return labels[cardType.value]
})

watch(method, (newMethod) => {
  setFieldValue('method', newMethod)
  resetForm({ values: { ...values, method: newMethod } })
})

function onCardInput(event: Event) {
  const target = event.target as HTMLInputElement
  const formatted = formatCardNumber(target.value)
  setFieldValue('cardNumber', formatted)
}

function onDiscountApplied(code: string, percent: number) {
  emit('discount', code, percent)
}

const onSubmit = handleSubmit((formValues) => {
  emit('valid', { method: method.value, ...formValues } as unknown as Partial<PaymentData>)
})

defineExpose({ submit: onSubmit })

// Datos bancarios de la empresa para transferencia
const bankDetails = {
  iban: 'ES12 3456 7890 1234 5678 9012',
  bic: 'ABCDESMMXXX',
  titular: 'Tienda Online S.L.',
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2>Método de pago</h2>

    <div class="payment-methods">
      <label v-for="opt in [
        { value: 'card', label: 'Tarjeta de crédito/débito' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'transfer', label: 'Transferencia bancaria' },
        { value: 'bizum', label: 'Bizum' },
      ]" :key="opt.value" class="method-option">
        <input type="radio" name="paymentMethod" :value="opt.value" v-model="method" />
        {{ opt.label }}
      </label>
    </div>

    <!-- Tarjeta -->
    <template v-if="method === 'card'">
      <div class="form-field">
        <label for="cardNumber">
          Número de tarjeta
          <span v-if="cardTypeLabel" class="card-type">{{ cardTypeLabel }}</span>
        </label>
        <input
          id="cardNumber"
          type="text"
          :value="values.cardNumber"
          @input="onCardInput"
          placeholder="4532 0151 1283 0366"
          maxlength="19"
        />
      </div>
      <FormField name="cardHolder" label="Nombre del titular" />
      <FormField name="expiryDate" label="Fecha de expiración (MM/YY)" placeholder="12/28" />
      <FormField name="cvv" label="CVV" :type="'password'" />
    </template>

    <!-- PayPal -->
    <template v-if="method === 'paypal'">
      <FormField name="paypalEmail" label="Email de PayPal" type="email" />
    </template>

    <!-- Transferencia -->
    <template v-if="method === 'transfer'">
      <div class="bank-info">
        <p><strong>IBAN:</strong> {{ bankDetails.iban }}</p>
        <p><strong>BIC:</strong> {{ bankDetails.bic }}</p>
        <p><strong>Titular:</strong> {{ bankDetails.titular }}</p>
      </div>
      <FormField name="reference" label="Referencia de la transferencia" />
    </template>

    <!-- Bizum -->
    <template v-if="method === 'bizum'">
      <FormField name="bizumPhone" label="Teléfono móvil para Bizum" type="tel" />
    </template>

    <DiscountCode
      :current-code="discountCode"
      :current-percent="discountPercent"
      @applied="onDiscountApplied"
    />
  </form>
</template>

<style scoped>
h2 { margin-bottom: 16px; font-size: 1.2em; }
.payment-methods { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.method-option { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.form-field { margin-bottom: 12px; }
.form-field label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 0.9em; }
.form-field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.card-type { color: #2563eb; font-weight: 600; margin-left: 8px; font-size: 0.85em; }
.bank-info { padding: 12px; background: #f3f4f6; border-radius: 4px; margin-bottom: 12px; font-size: 0.9em; }
.bank-info p { margin: 4px 0; }
</style>
