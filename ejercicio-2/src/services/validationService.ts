import { POSTAL_CODES } from '@/types/address'
import type { PostalCodeInfo } from '@/types/address'

const postalCodeCache: Record<string, PostalCodeInfo | null> = {}

// Validar NIF/CIF español
const NIF_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'

export function validateNIF(value: string): boolean {
    const upper = value.toUpperCase()
    const nifRegex = /^[0-9]{8}[A-Z]$|^[A-Z][0-9]{7}[A-Z]$/
    if (!nifRegex.test(upper)) return false

    let numStr: string
    if (/^[XYZ]/.test(upper)) {
        const prefix = upper[0] === 'X' ? '0' : upper[0] === 'Y' ? '1' : '2'
        numStr = prefix + upper.substring(1, 8)
    } else {
        numStr = upper.substring(0, 8)
    }
    const expectedLetter = NIF_LETTERS[parseInt(numStr) % 23]
    return upper[upper.length - 1] === expectedLetter
}

// Validación asíncrona de código postal (simula API call con 500ms delay)
export async function validatePostalCode(postalCode: string): Promise<PostalCodeInfo | null> {
    // Comprobar caché
    if (postalCode in postalCodeCache) {
        return postalCodeCache[postalCode]
    }

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const info = POSTAL_CODES[postalCode] || null
    postalCodeCache[postalCode] = info
    return info
}

// Validación asíncrona de código de descuento
const DISCOUNT_CODES: Record<string, number> = {
    BIENVENIDO10: 10,
    VERANO20: 20,
    VIP30: 30,
}

export async function validateDiscountCode(
    code: string,
): Promise<{ valid: boolean; percent: number }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const upper = code.toUpperCase()
    if (upper in DISCOUNT_CODES) {
        return { valid: true, percent: DISCOUNT_CODES[upper] }
    }
    return { valid: false, percent: 0 }
}
