import { reactive, computed } from 'vue'
import type { ReservationFormData, FieldValidation, FormErrors } from '@/types/reservation'
import {
    validateFullName,
    validateNIF,
    validatePhone,
    validateEmail,
    validateEventType,
    validateEventDate,
    validateStartTime,
    validateAttendees,
    validateCatering,
    validateBudget,
    validateComments,
    validateTerms,
} from '@/utils/validators'

type ValidatorMap = Record<string, (value: never) => FieldValidation>

const validators: ValidatorMap = {
    fullName: validateFullName as (v: never) => FieldValidation,
    nif: validateNIF as (v: never) => FieldValidation,
    phone: validatePhone as (v: never) => FieldValidation,
    email: validateEmail as (v: never) => FieldValidation,
    eventType: validateEventType as (v: never) => FieldValidation,
    eventDate: validateEventDate as (v: never) => FieldValidation,
    startTime: validateStartTime as (v: never) => FieldValidation,
    attendees: validateAttendees as (v: never) => FieldValidation,
    catering: validateCatering as (v: never) => FieldValidation,
    budget: validateBudget as (v: never) => FieldValidation,
    comments: validateComments as (v: never) => FieldValidation,
    termsAccepted: validateTerms as (v: never) => FieldValidation,
}

export function useValidation(formData: ReservationFormData) {
    const errors = reactive<FormErrors>({})
    const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {}

    // Validar un campo individual
    function validateField(field: keyof ReservationFormData) {
        const validator = validators[field as string]
        if (validator) {
            errors[field] = validator(formData[field] as never)
        }
    }

    // Validar con debounce (500ms) para validación en tiempo real
    function validateFieldDebounced(field: keyof ReservationFormData) {
        if (debounceTimers[field]) {
            clearTimeout(debounceTimers[field])
        }
        debounceTimers[field] = setTimeout(() => {
            validateField(field)
        }, 500)
    }

    // Validar al perder foco (blur)
    function validateOnBlur(field: keyof ReservationFormData) {
        validateField(field)
    }

    // Validar todos los campos
    function validateAll(): boolean {
        const fields = Object.keys(validators) as (keyof ReservationFormData)[]
        fields.forEach((field) => validateField(field))
        return fields.every((field) => errors[field]?.isValid)
    }

    // Primer campo con error
    function firstErrorField(): string | null {
        const fields = Object.keys(validators)
        for (const field of fields) {
            if (errors[field as keyof FormErrors] && !errors[field as keyof FormErrors]!.isValid) {
                return field
            }
        }
        return null
    }

    // Verificar si el formulario es válido (todos los campos tocados y sin errores)
    const isFormValid = computed(() => {
        const fields = Object.keys(validators) as (keyof ReservationFormData)[]
        return fields.every((field) => errors[field]?.isValid)
    })

    // Porcentaje de progreso
    const progress = computed(() => {
        const fields = Object.keys(validators)
        const validCount = fields.filter(
            (field) => errors[field as keyof FormErrors]?.isValid,
        ).length
        return Math.round((validCount / fields.length) * 100)
    })

    // Limpiar errores
    function clearErrors() {
        const fields = Object.keys(errors) as (keyof FormErrors)[]
        fields.forEach((field) => delete errors[field])
    }

    return {
        errors,
        validateField,
        validateFieldDebounced,
        validateOnBlur,
        validateAll,
        firstErrorField,
        isFormValid,
        progress,
        clearErrors,
    }
}
