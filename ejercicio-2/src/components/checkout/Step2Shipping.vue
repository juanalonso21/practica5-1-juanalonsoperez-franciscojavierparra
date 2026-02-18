<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { shippingSchema } from '@/composables/useValidationSchemas'
import { validatePostalCode } from '@/services/validationService'
import FormField from '@/components/common/FormField.vue'
import type { ShippingData } from '@/types/checkout'

const props = defineProps<{
  shipping: ShippingData
}>()

const emit = defineEmits<{
  valid: [data: ShippingData]
}>()

const validatingCP = ref(false)

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(shippingSchema),
  initialValues: { ...props.shipping },
})

watch(() => values.sameAsBilling, (val) => {
  if (val) {
    setFieldValue('recipientName', '')
    setFieldValue('address', '')
    setFieldValue('postalCode', '')
    setFieldValue('city', '')
    setFieldValue('province', '')
    setFieldValue('contactPhone', '')
  }
})

async function onPostalCodeBlur() {
  const cp = values.postalCode
  if (cp && /^[0-9]{5}$/.test(cp)) {
    validatingCP.value = true
    const info = await validatePostalCode(cp)
    validatingCP.value = false
    if (info) {
      setFieldValue('city', info.city)
      setFieldValue('province', info.province)
    }
  }
}

const onSubmit = handleSubmit((formValues) => {
  emit('valid', formValues as unknown as ShippingData)
})

defineExpose({ submit: onSubmit })
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2>Dirección de envío</h2>
    <div class="checkbox-field">
      <label>
        <input type="checkbox" :checked="values.sameAsBilling" @change="setFieldValue('sameAsBilling', !values.sameAsBilling)" />
        Misma dirección que facturación
      </label>
    </div>

    <template v-if="!values.sameAsBilling">
      <FormField name="recipientName" label="Nombre del destinatario" />
      <FormField name="address" label="Dirección de envío" />
      <div style="position: relative;">
        <FormField name="postalCode" label="Código postal" @blur="onPostalCodeBlur" />
        <span v-if="validatingCP" class="spinner">Validando...</span>
      </div>
      <FormField name="city" label="Ciudad" />
      <FormField name="province" label="Provincia" />
      <div class="form-field">
        <label for="shippingCountry">País</label>
        <select id="shippingCountry" :value="values.country" @change="(e) => setFieldValue('country', (e.target as HTMLSelectElement).value)">
          <option value="es">España</option>
          <option value="pt">Portugal</option>
          <option value="fr">Francia</option>
        </select>
      </div>
      <FormField name="contactPhone" label="Teléfono de contacto" type="tel" />
      <FormField name="deliveryInstructions" label="Instrucciones de entrega" as="textarea" />
    </template>
  </form>
</template>

<style scoped>
h2 { margin-bottom: 16px; font-size: 1.2em; }
.checkbox-field { margin-bottom: 16px; }
.checkbox-field label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-field { margin-bottom: 12px; }
.form-field label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 0.9em; }
.spinner { font-size: 0.8em; color: #2563eb; }
</style>
