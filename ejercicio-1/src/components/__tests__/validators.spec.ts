import { describe, it, expect } from 'vitest'
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
import { NAME_REGEX, NIF_REGEX, PHONE_REGEX, EMAIL_REGEX } from '@/utils/regex'

// Tests de expresiones regulares
describe('Regex patterns', () => {
    describe('NAME_REGEX', () => {
        it('acepta nombres válidos con tildes', () => {
            expect(NAME_REGEX.test('José María')).toBe(true)
            expect(NAME_REGEX.test('Ana García López')).toBe(true)
            expect(NAME_REGEX.test('Ñoño')).toBe(true)
        })
        it('rechaza nombres con números o caracteres especiales', () => {
            expect(NAME_REGEX.test('Juan123')).toBe(false)
            expect(NAME_REGEX.test('Ana@García')).toBe(false)
        })
        it('rechaza nombres demasiado cortos', () => {
            expect(NAME_REGEX.test('Ab')).toBe(false)
        })
    })

    describe('NIF_REGEX', () => {
        it('acepta NIF válidos', () => {
            expect(NIF_REGEX.test('12345678Z')).toBe(true)
            expect(NIF_REGEX.test('X1234567L')).toBe(true)
            expect(NIF_REGEX.test('Y1234567X')).toBe(true)
        })
        it('rechaza formatos inválidos', () => {
            expect(NIF_REGEX.test('1234567Z')).toBe(false)
            expect(NIF_REGEX.test('123456789')).toBe(false)
            expect(NIF_REGEX.test('ABCDEFGHI')).toBe(false)
        })
    })

    describe('PHONE_REGEX', () => {
        it('acepta teléfonos españoles válidos', () => {
            expect(PHONE_REGEX.test('612345678')).toBe(true)
            expect(PHONE_REGEX.test('712345678')).toBe(true)
            expect(PHONE_REGEX.test('912345678')).toBe(true)
        })
        it('rechaza teléfonos inválidos', () => {
            expect(PHONE_REGEX.test('112345678')).toBe(false)
            expect(PHONE_REGEX.test('61234567')).toBe(false)
            expect(PHONE_REGEX.test('6123456789')).toBe(false)
        })
    })

    describe('EMAIL_REGEX', () => {
        it('acepta emails válidos', () => {
            expect(EMAIL_REGEX.test('test@example.com')).toBe(true)
            expect(EMAIL_REGEX.test('user.name@domain.es')).toBe(true)
        })
        it('rechaza emails inválidos', () => {
            expect(EMAIL_REGEX.test('test@')).toBe(false)
            expect(EMAIL_REGEX.test('test@.com')).toBe(false)
            expect(EMAIL_REGEX.test('@domain.com')).toBe(false)
        })
    })
})

// Tests de funciones de validación
describe('Validators', () => {
    describe('validateFullName', () => {
        it('devuelve error si está vacío', () => {
            const result = validateFullName('')
            expect(result.isValid).toBe(false)
        })
        it('válido con nombre correcto', () => {
            const result = validateFullName('José García')
            expect(result.isValid).toBe(true)
        })
    })

    describe('validateNIF', () => {
        it('valida NIF con letra correcta', () => {
            // 00000000T es un NIF válido
            const result = validateNIF('00000000T')
            expect(result.isValid).toBe(true)
        })
        it('rechaza NIF con letra incorrecta', () => {
            const result = validateNIF('00000000A')
            expect(result.isValid).toBe(false)
        })
        it('rechaza campo vacío', () => {
            const result = validateNIF('')
            expect(result.isValid).toBe(false)
        })
    })

    describe('validatePhone', () => {
        it('acepta teléfono español válido', () => {
            expect(validatePhone('612345678').isValid).toBe(true)
        })
        it('rechaza teléfono inválido', () => {
            expect(validatePhone('123456789').isValid).toBe(false)
        })
    })

    describe('validateEmail', () => {
        it('acepta email válido', () => {
            expect(validateEmail('a@b.com').isValid).toBe(true)
        })
        it('rechaza email inválido', () => {
            expect(validateEmail('invalido').isValid).toBe(false)
        })
    })

    describe('validateEventType', () => {
        it('rechaza vacío', () => {
            expect(validateEventType('').isValid).toBe(false)
        })
        it('acepta tipo de evento', () => {
            expect(validateEventType('boda').isValid).toBe(true)
        })
    })

    describe('validateEventDate', () => {
        it('rechaza fecha vacía', () => {
            expect(validateEventDate('').isValid).toBe(false)
        })
        it('rechaza fecha pasada', () => {
            expect(validateEventDate('2020-01-01').isValid).toBe(false)
        })
        it('acepta fecha futura >7 días', () => {
            const future = new Date()
            future.setDate(future.getDate() + 14)
            const dateStr = future.toISOString().split('T')[0]
            expect(validateEventDate(dateStr).isValid).toBe(true)
        })
    })

    describe('validateStartTime', () => {
        it('acepta hora en rango', () => {
            expect(validateStartTime('14:00').isValid).toBe(true)
        })
        it('rechaza hora fuera de rango', () => {
            expect(validateStartTime('05:00').isValid).toBe(false)
        })
    })

    describe('validateAttendees', () => {
        it('acepta número en rango', () => {
            expect(validateAttendees(50).isValid).toBe(true)
        })
        it('rechaza número fuera de rango', () => {
            expect(validateAttendees(5).isValid).toBe(false)
            expect(validateAttendees(600).isValid).toBe(false)
        })
    })

    describe('validateCatering', () => {
        it('rechaza array vacío', () => {
            expect(validateCatering([]).isValid).toBe(false)
        })
        it('acepta con opciones', () => {
            expect(validateCatering(['vegetariano']).isValid).toBe(true)
        })
    })

    describe('validateBudget', () => {
        it('rechaza vacío', () => {
            expect(validateBudget('').isValid).toBe(false)
        })
        it('acepta opción', () => {
            expect(validateBudget('premium').isValid).toBe(true)
        })
    })

    describe('validateComments', () => {
        it('acepta vacío (opcional)', () => {
            expect(validateComments('').isValid).toBe(true)
        })
        it('rechaza más de 500 caracteres', () => {
            expect(validateComments('a'.repeat(501)).isValid).toBe(false)
        })
        it('rechaza solo espacios', () => {
            expect(validateComments('   ').isValid).toBe(false)
        })
    })

    describe('validateTerms', () => {
        it('rechaza no aceptados', () => {
            expect(validateTerms(false).isValid).toBe(false)
        })
        it('acepta cuando están marcados', () => {
            expect(validateTerms(true).isValid).toBe(true)
        })
    })
})
