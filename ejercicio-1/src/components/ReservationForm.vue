<script setup lang="ts">
import { ref, nextTick } from 'vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormCheckbox from './FormCheckbox.vue'
import FormRadio from './FormRadio.vue'
import ErrorMessage from './ErrorMessage.vue'
import { useFormState } from '@/composables/useFormState'
import { useValidation } from '@/composables/useValidation'
import {
  EVENT_TYPES,
  CATERING_OPTIONS,
  BUDGET_OPTIONS,
} from '@/types/reservation'
import type { ReservationFormData } from '@/types/reservation'

const { formData, resetForm } = useFormState()
const {
  errors,
  validateFieldDebounced,
  validateOnBlur,
  validateAll,
  firstErrorField,
  isFormValid,
  progress,
  clearErrors,
} = useValidation(formData)

const submitted = ref(false)

function onInput(field: keyof ReservationFormData) {
  validateFieldDebounced(field)
}

function onBlur(field: keyof ReservationFormData) {
  validateOnBlur(field)
}

function onAttendeesInput(event: Event) {
  const target = event.target as HTMLInputElement
  formData.attendees = Number(target.value)
  validateFieldDebounced('attendees')
}

async function handleSubmit() {
  const valid = validateAll()
  if (!valid) {
    const errorField = firstErrorField()
    if (errorField) {
      await nextTick()
      const el = document.getElementById(errorField)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus()
    }
    return
  }
  submitted.value = true
}

function handleReset() {
  resetForm()
  clearErrors()
  submitted.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <!-- Barra de progreso -->
    <div class="progress-bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      <span class="progress-text">{{ progress }}% completado</span>
    </div>

    <!-- Datos Personales -->
    <fieldset>
      <legend>Datos Personales</legend>

      <FormInput
        label="Nombre completo"
        name="fullName"
        v-model="formData.fullName"
        :validation="errors.fullName"
        @input="onInput('fullName')"
        @blur="onBlur('fullName')"
      />

      <FormInput
        label="NIF/NIE"
        name="nif"
        v-model="formData.nif"
        :validation="errors.nif"
        @input="onInput('nif')"
        @blur="onBlur('nif')"
      />

      <FormInput
        label="Teléfono móvil"
        name="phone"
        type="tel"
        v-model="formData.phone"
        :validation="errors.phone"
        @input="onInput('phone')"
        @blur="onBlur('phone')"
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        v-model="formData.email"
        :validation="errors.email"
        @input="onInput('email')"
        @blur="onBlur('email')"
      />
    </fieldset>

    <!-- Detalles del Evento -->
    <fieldset>
      <legend>Detalles del Evento</legend>

      <FormSelect
        label="Tipo de evento"
        name="eventType"
        v-model="formData.eventType"
        :options="EVENT_TYPES"
        :validation="errors.eventType"
        @change="onBlur('eventType')"
        @blur="onBlur('eventType')"
      />

      <FormInput
        label="Fecha del evento"
        name="eventDate"
        type="date"
        v-model="formData.eventDate"
        :validation="errors.eventDate"
        @input="onInput('eventDate')"
        @blur="onBlur('eventDate')"
      />

      <FormInput
        label="Hora de inicio"
        name="startTime"
        type="time"
        v-model="formData.startTime"
        :validation="errors.startTime"
        @input="onInput('startTime')"
        @blur="onBlur('startTime')"
      />

      <!-- Número de asistentes: input number + range sincronizados -->
      <div class="form-group">
        <label for="attendees">Número de asistentes: {{ formData.attendees }}</label>
        <div class="attendees-row">
          <input
            type="range"
            id="attendees-range"
            min="10"
            max="500"
            :value="formData.attendees"
            @input="onAttendeesInput"
            aria-label="Número de asistentes (slider)"
          />
          <input
            type="number"
            id="attendees"
            min="10"
            max="500"
            :value="formData.attendees"
            @input="onAttendeesInput"
            @blur="onBlur('attendees')"
            :class="{ 'input-valid': errors.attendees?.touched && errors.attendees?.isValid, 'input-invalid': errors.attendees?.touched && !errors.attendees?.isValid }"
            aria-label="Número de asistentes"
            style="width: 80px"
          />
        </div>
        <ErrorMessage :validation="errors.attendees" />
      </div>
    </fieldset>

    <!-- Servicios Adicionales -->
    <fieldset>
      <legend>Servicios Adicionales</legend>

      <FormCheckbox
        label="Opciones de catering"
        name="catering"
        v-model="formData.catering"
        :options="CATERING_OPTIONS"
        :validation="errors.catering"
        @change="onBlur('catering')"
      />

      <FormRadio
        label="Presupuesto aproximado"
        name="budget"
        v-model="formData.budget"
        :options="BUDGET_OPTIONS"
        :validation="errors.budget"
        @change="onBlur('budget')"
      />

      <!-- Comentarios con contador -->
      <div class="form-group">
        <label for="comments">Comentarios adicionales (opcional)</label>
        <textarea
          id="comments"
          name="comments"
          v-model="formData.comments"
          maxlength="500"
          rows="3"
          @input="onInput('comments')"
          @blur="onBlur('comments')"
          :class="{ 'input-valid': errors.comments?.touched && errors.comments?.isValid, 'input-invalid': errors.comments?.touched && !errors.comments?.isValid }"
          aria-describedby="comments-counter"
        ></textarea>
        <span id="comments-counter" class="char-counter">{{ formData.comments.length }}/500</span>
        <ErrorMessage :validation="errors.comments" />
      </div>

      <!-- Términos y condiciones -->
      <div class="form-group terms">
        <label for="termsAccepted">
          <input
            type="checkbox"
            id="termsAccepted"
            v-model="formData.termsAccepted"
            @change="onBlur('termsAccepted')"
          />
          Acepto los términos y condiciones
        </label>
        <ErrorMessage :validation="errors.termsAccepted" />
      </div>
    </fieldset>

    <!-- Botones -->
    <div class="form-actions">
      <button type="submit" :disabled="!isFormValid" class="btn-submit">Enviar Reserva</button>
      <button type="button" @click="handleReset" class="btn-reset">Limpiar</button>
    </div>

    <!-- Resumen de reserva -->
    <div v-if="submitted" class="summary">
      <h3>✓ Reserva enviada correctamente</h3>
      <dl>
        <dt>Nombre</dt><dd>{{ formData.fullName }}</dd>
        <dt>NIF/NIE</dt><dd>{{ formData.nif }}</dd>
        <dt>Teléfono</dt><dd>{{ formData.phone }}</dd>
        <dt>Email</dt><dd>{{ formData.email }}</dd>
        <dt>Tipo de evento</dt><dd>{{ formData.eventType }}</dd>
        <dt>Fecha</dt><dd>{{ formData.eventDate }}</dd>
        <dt>Hora</dt><dd>{{ formData.startTime }}</dd>
        <dt>Asistentes</dt><dd>{{ formData.attendees }}</dd>
        <dt>Catering</dt><dd>{{ formData.catering.join(', ') }}</dd>
        <dt>Presupuesto</dt><dd>{{ formData.budget }}</dd>
        <dt>Comentarios</dt><dd>{{ formData.comments || 'Sin comentarios' }}</dd>
      </dl>
    </div>

    <!-- Resumen en tiempo real -->
    <div v-if="!submitted && progress > 0" class="live-summary">
      <h4>Vista previa de la reserva</h4>
      <ul>
        <li v-if="formData.fullName">Nombre: {{ formData.fullName }}</li>
        <li v-if="formData.nif">NIF: {{ formData.nif }}</li>
        <li v-if="formData.phone">Teléfono: {{ formData.phone }}</li>
        <li v-if="formData.email">Email: {{ formData.email }}</li>
        <li v-if="formData.eventType">Evento: {{ formData.eventType }}</li>
        <li v-if="formData.eventDate">Fecha: {{ formData.eventDate }}</li>
        <li v-if="formData.startTime">Hora: {{ formData.startTime }}</li>
        <li v-if="formData.attendees">Asistentes: {{ formData.attendees }}</li>
        <li v-if="formData.catering.length">Catering: {{ formData.catering.join(', ') }}</li>
        <li v-if="formData.budget">Presupuesto: {{ formData.budget }}</li>
      </ul>
    </div>
  </form>
</template>

<style scoped>
form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
fieldset {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
}
legend {
  font-weight: 600;
  font-size: 1.1em;
  padding: 0 8px;
}
.form-group { margin-bottom: 12px; }
label { display: block; margin-bottom: 4px; font-weight: 500; }
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
.input-valid { border-color: green; }
.input-invalid { border-color: red; }
.char-counter { font-size: 0.8em; color: #666; }
.attendees-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.attendees-row input[type="range"] { flex: 1; }
.terms label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
.btn-submit {
  padding: 10px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}
.btn-submit:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}
.btn-reset {
  padding: 10px 24px;
  background: #e5e7eb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}
.progress-bar {
  background: #e5e7eb;
  border-radius: 8px;
  height: 24px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
}
.progress-fill {
  background: #2563eb;
  height: 100%;
  transition: width 0.3s;
  border-radius: 8px;
}
.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8em;
  font-weight: 500;
}
.summary, .live-summary {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #f9fafb;
}
.summary h3 { color: green; margin-top: 0; }
.summary dl { display: grid; grid-template-columns: 140px 1fr; gap: 4px 12px; }
.summary dt { font-weight: 600; }
.live-summary h4 { margin-top: 0; }
.live-summary ul { list-style: none; padding: 0; }
.live-summary li { padding: 2px 0; }
</style>