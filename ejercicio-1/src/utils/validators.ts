import { NAME_REGEX, NIF_REGEX, PHONE_REGEX, EMAIL_REGEX, NOT_ONLY_SPACES_REGEX } from './regex'
import type { ReservationFormData, FieldValidation } from '@/types/reservation'

// Tabla de letras para validar NIF
const NIF_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'

function ok(message = ''): FieldValidation {
    return { isValid: true, message, touched: true }
}

function fail(message: string): FieldValidation {
    return { isValid: false, message, touched: true }
}

export function validateFullName(value: string): FieldValidation {
    if (!value.trim()) return fail('El nombre es obligatorio')
    if (!NAME_REGEX.test(value)) return fail('Solo letras, espacios y tildes (3-50 caracteres)')
    return ok()
}

export function validateNIF(value: string): FieldValidation {
    if (!value.trim()) return fail('El NIF/NIE es obligatorio')
    const upper = value.toUpperCase()
    if (!NIF_REGEX.test(upper)) return fail('Formato inválido (ej: 12345678Z o X1234567L)')

    // Validar letra correcta del NIF
    let numStr: string
    if (/^[XYZ]/.test(upper)) {
        const prefix = upper[0] === 'X' ? '0' : upper[0] === 'Y' ? '1' : '2'
        numStr = prefix + upper.substring(1, 8)
    } else {
        numStr = upper.substring(0, 8)
    }
    const expectedLetter = NIF_LETTERS[parseInt(numStr) % 23]
    if (upper[upper.length - 1] !== expectedLetter) {
        return fail('La letra del NIF no es correcta')
    }
    return ok()
}

export function validatePhone(value: string): FieldValidation {
    if (!value.trim()) return fail('El teléfono es obligatorio')
    if (!PHONE_REGEX.test(value)) return fail('Formato: 9 dígitos, empezando por 6, 7 o 9')
    return ok()
}

export function validateEmail(value: string): FieldValidation {
    if (!value.trim()) return fail('El email es obligatorio')
    if (!EMAIL_REGEX.test(value)) return fail('Formato de email inválido')
    return ok()
}

export function validateEventType(value: string): FieldValidation {
    if (!value) return fail('Selecciona un tipo de evento')
    return ok()
}

export function validateEventDate(value: string): FieldValidation {
    if (!value) return fail('La fecha es obligatoria')
    const date = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const minDate = new Date(today)
    minDate.setDate(minDate.getDate() + 7)

    const maxDate = new Date(today)
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    if (date < minDate) return fail('La fecha debe ser al menos 7 días desde hoy')
    if (date > maxDate) return fail('La fecha no puede ser más de 1 año desde hoy')
    return ok()
}

export function validateStartTime(value: string): FieldValidation {
    if (!value) return fail('La hora de inicio es obligatoria')
    const [hours] = value.split(':').map(Number)
    if (hours < 8 || hours > 23) return fail('La hora debe ser entre 08:00 y 23:00')
    return ok()
}

export function validateAttendees(value: number): FieldValidation {
    if (!Number.isInteger(value)) return fail('Debe ser un número entero')
    if (value < 10 || value > 500) return fail('Entre 10 y 500 personas')
    return ok()
}

export function validateCatering(value: string[]): FieldValidation {
    if (!value || value.length === 0) return fail('Selecciona al menos una opción de catering')
    return ok()
}

export function validateBudget(value: string): FieldValidation {
    if (!value) return fail('Selecciona un presupuesto')
    return ok()
}

export function validateComments(value: string): FieldValidation {
    if (value && value.length > 500) return fail('Máximo 500 caracteres')
    if (value && !NOT_ONLY_SPACES_REGEX.test(value)) return fail('El comentario no puede ser solo espacios')
    return ok()
}

export function validateTerms(value: boolean): FieldValidation {
    if (!value) return fail('Debes aceptar los términos y condiciones')
    return ok()
}

// Validar todo el formulario a la vez
export function validateForm(data: ReservationFormData): Record<string, FieldValidation> {
    return {
        fullName: validateFullName(data.fullName),
        nif: validateNIF(data.nif),
        phone: validatePhone(data.phone),
        email: validateEmail(data.email),
        eventType: validateEventType(data.eventType),
        eventDate: validateEventDate(data.eventDate),
        startTime: validateStartTime(data.startTime),
        attendees: validateAttendees(data.attendees),
        catering: validateCatering(data.catering),
        budget: validateBudget(data.budget),
        comments: validateComments(data.comments),
        termsAccepted: validateTerms(data.termsAccepted),
    }
}
