<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { billingSchema } from '@/composables/useValidationSchemas'
import { validatePostalCode } from '@/services/validationService'
import FormField from '@/components/common/FormField.vue'
import type { BillingData } from '@/types/checkout'

const props = defineProps<{
  billing: BillingData
}>()

const emit = defineEmits<{
  valid: [data: BillingData]
}>()

const validatingCP = ref(false)

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(billingSchema),
  initialValues: { ...props.billing },
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
  emit('valid', formValues as BillingData)
})

defineExpose({ submit: onSubmit })
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2>Datos de facturación</h2>
    <FormField name="fullName" label="Nombre completo" />
    <FormField name="nif" label="NIF/CIF" />
    <FormField name="email" label="Email" type="email" />
    <FormField name="phone" label="Teléfono" type="tel" />
    <FormField name="address" label="Dirección" />
    <div style="position: relative;">
      <FormField name="postalCode" label="Código postal" @blur="onPostalCodeBlur" />
      <span v-if="validatingCP" class="spinner">Validando...</span>
    </div>
    <FormField name="city" label="Ciudad" />
    <FormField name="province" label="Provincia" />
    <div class="form-field">
      <label for="country">País</label>
      <select id="country" name="country" :value="values.country" @change="(e) => setFieldValue('country', (e.target as HTMLSelectElement).value)">
        <option value="es">España</option>
        <option value="pt">Portugal</option>
        <option value="fr">Francia</option>
        <option value="it">Italia</option>
      </select>
    </div>
  </form>
</template>

<style scoped>
h2 { margin-bottom: 16px; font-size: 1.2em; }
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
