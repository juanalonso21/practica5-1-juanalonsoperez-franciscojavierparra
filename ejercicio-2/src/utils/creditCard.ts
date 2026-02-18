import type { CardType } from '@/types/payment'

// Algoritmo de Luhn para validar números de tarjeta
export function luhnCheck(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\s/g, '')
    if (!/^\d+$/.test(digits)) return false

    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10)
        if (isEven) {
            digit *= 2
            if (digit > 9) digit -= 9
        }
        sum += digit
        isEven = !isEven
    }

    return sum % 10 === 0
}

// Detectar tipo de tarjeta por su número
export function detectCardType(cardNumber: string): CardType {
    const cleaned = cardNumber.replace(/\s/g, '')
    if (/^4/.test(cleaned)) return 'visa'
    if (/^5[1-5]/.test(cleaned)) return 'mastercard'
    if (/^3[47]/.test(cleaned)) return 'amex'
    return 'unknown'
}

// Formatear número de tarjeta con espacios cada 4 dígitos
export function formatCardNumber(value: string): string {
    const cleaned = value.replace(/\D/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleaned
}

// Largo esperado de CVV según tipo de tarjeta
export function getCvvLength(cardType: CardType): number {
    return cardType === 'amex' ? 4 : 3
}

// Validar fecha de expiración MM/YY
export function isExpiryValid(expiry: string): boolean {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/)
    if (!match) return false

    const month = parseInt(match[1], 10)
    const year = parseInt(match[2], 10) + 2000

    if (month < 1 || month > 12) return false

    const now = new Date()
    const expiryDate = new Date(year, month)
    return expiryDate > now
}
