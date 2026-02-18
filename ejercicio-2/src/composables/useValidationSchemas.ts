import * as yup from 'yup'
import { validateNIF } from '@/services/validationService'
import { luhnCheck, detectCardType, getCvvLength } from '@/utils/creditCard'

// Esquema de validación para Paso 1 - Facturación
export const billingSchema = yup.object({
    fullName: yup
        .string()
        .required('El nombre es obligatorio')
        .min(3, 'Mínimo 3 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo letras y espacios'),
    nif: yup
        .string()
        .required('El NIF/CIF es obligatorio')
        .matches(/^[0-9]{8}[A-Z]$|^[A-Z][0-9]{7}[A-Z]$/i, 'Formato inválido')
        .test('valid-nif', 'NIF inválido', (value) => (value ? validateNIF(value) : false)),
    email: yup.string().required('El email es obligatorio').email('Formato de email inválido'),
    phone: yup
        .string()
        .required('El teléfono es obligatorio')
        .matches(/^[679][0-9]{8}$/, 'Formato español: 9 dígitos empezando por 6, 7 o 9'),
    address: yup.string().required('La dirección es obligatoria'),
    postalCode: yup
        .string()
        .required('El código postal es obligatorio')
        .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos'),
    city: yup.string().required('La ciudad es obligatoria'),
    province: yup.string().required('La provincia es obligatoria'),
    country: yup.string().required('El país es obligatorio'),
})

// Esquema para Paso 2 - Envío (campos solo obligatorios si sameAsBilling = false)
export const shippingSchema = yup.object({
    sameAsBilling: yup.boolean(),
    recipientName: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) => schema.required('El nombre del destinatario es obligatorio'),
    }),
    address: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) => schema.required('La dirección de envío es obligatoria'),
    }),
    postalCode: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) =>
            schema.required('El código postal es obligatorio').matches(/^[0-9]{5}$/, '5 dígitos'),
    }),
    city: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) => schema.required('La ciudad es obligatoria'),
    }),
    province: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) => schema.required('La provincia es obligatoria'),
    }),
    country: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) => schema.required('El país es obligatorio'),
    }),
    contactPhone: yup.string().when('sameAsBilling', {
        is: false,
        then: (schema) =>
            schema.required('El teléfono es obligatorio').matches(/^[679][0-9]{8}$/, 'Formato inválido'),
    }),
    deliveryInstructions: yup.string().max(200, 'Máximo 200 caracteres'),
})

// Esquema para Paso 3 - Pago (dinámico según método)
export function getPaymentSchema(method: string) {
    const base: Record<string, yup.StringSchema> = {
        method: yup.string().required('Selecciona un método de pago'),
    }

    if (method === 'card') {
        return yup.object({
            ...base,
            cardNumber: yup
                .string()
                .required('El número de tarjeta es obligatorio')
                .test('luhn', 'Número de tarjeta inválido', (value) =>
                    value ? luhnCheck(value.replace(/\s/g, '')) : false,
                ),
            cardHolder: yup.string().required('El nombre del titular es obligatorio'),
            expiryDate: yup
                .string()
                .required('La fecha de expiración es obligatoria')
                .matches(/^\d{2}\/\d{2}$/, 'Formato MM/YY'),
            cvv: yup
                .string()
                .required('El CVV es obligatorio')
                .test('cvv-length', 'CVV inválido', function (value) {
                    if (!value) return false
                    const cardNumber = this.parent.cardNumber || ''
                    const cardType = detectCardType(cardNumber.replace(/\s/g, ''))
                    return value.length === getCvvLength(cardType)
                }),
        })
    }

    if (method === 'paypal') {
        return yup.object({
            ...base,
            paypalEmail: yup
                .string()
                .required('El email de PayPal es obligatorio')
                .email('Formato de email inválido'),
        })
    }

    if (method === 'transfer') {
        return yup.object({
            ...base,
            reference: yup.string().required('La referencia es obligatoria'),
        })
    }

    if (method === 'bizum') {
        return yup.object({
            ...base,
            bizumPhone: yup
                .string()
                .required('El teléfono de Bizum es obligatorio')
                .matches(/^[679][0-9]{8}$/, 'Formato español inválido'),
        })
    }

    return yup.object(base)
}

// Esquema para Paso 4 - Confirmación
export const confirmationSchema = yup.object({
    termsAccepted: yup
        .boolean()
        .oneOf([true], 'Debes aceptar los términos y condiciones')
        .required(),
    privacyAccepted: yup
        .boolean()
        .oneOf([true], 'Debes aceptar la política de privacidad')
        .required(),
})
