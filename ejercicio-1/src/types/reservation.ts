export type EventType = 'boda' | 'cumpleanos' | 'corporativo' | 'conferencia' | 'otro'

export type CateringOption = 'vegetariano' | 'vegano' | 'barra_libre' | 'infantil' | 'cafe'

export type BudgetOption = 'economico' | 'estandar' | 'premium' | 'luxury'

export interface ReservationFormData {
    fullName: string
    nif: string
    phone: string
    email: string
    eventType: EventType | ''
    eventDate: string
    startTime: string
    attendees: number
    catering: CateringOption[]
    budget: BudgetOption | ''
    comments: string
    termsAccepted: boolean
}

export interface ValidationError {
    field: string
    message: string
}

export interface FieldValidation {
    isValid: boolean
    message: string
    touched: boolean
}

export type FormErrors = Partial<Record<keyof ReservationFormData, FieldValidation>>

export const CATERING_OPTIONS: { value: CateringOption; label: string }[] = [
    { value: 'vegetariano', label: 'Menú vegetariano' },
    { value: 'vegano', label: 'Menú vegano' },
    { value: 'barra_libre', label: 'Barra libre' },
    { value: 'infantil', label: 'Catering infantil' },
    { value: 'cafe', label: 'Servicio de café' },
]

export const EVENT_TYPES: { value: EventType; label: string }[] = [
    { value: 'boda', label: 'Boda' },
    { value: 'cumpleanos', label: 'Cumpleaños' },
    { value: 'corporativo', label: 'Corporativo' },
    { value: 'conferencia', label: 'Conferencia' },
    { value: 'otro', label: 'Otro' },
]

export const BUDGET_OPTIONS: { value: BudgetOption; label: string }[] = [
    { value: 'economico', label: 'Económico (< 2000€)' },
    { value: 'estandar', label: 'Estándar (2000€ - 5000€)' },
    { value: 'premium', label: 'Premium (5000€ - 10000€)' },
    { value: 'luxury', label: 'Luxury (> 10000€)' },
]

export function createEmptyFormData(): ReservationFormData {
    return {
        fullName: '',
        nif: '',
        phone: '',
        email: '',
        eventType: '',
        eventDate: '',
        startTime: '',
        attendees: 10,
        catering: [],
        budget: '',
        comments: '',
        termsAccepted: false,
    }
}
