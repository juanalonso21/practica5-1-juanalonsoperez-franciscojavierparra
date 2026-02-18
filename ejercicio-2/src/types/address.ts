export interface Address {
    address: string
    postalCode: string
    city: string
    province: string
    country: string
}

export interface PostalCodeInfo {
    city: string
    province: string
    valid: boolean
}

// Datos de códigos postales simulados
export const POSTAL_CODES: Record<string, PostalCodeInfo> = {
    '28001': { city: 'Madrid', province: 'Madrid', valid: true },
    '08001': { city: 'Barcelona', province: 'Barcelona', valid: true },
    '41001': { city: 'Sevilla', province: 'Sevilla', valid: true },
    '46001': { city: 'Valencia', province: 'Valencia', valid: true },
    '29001': { city: 'Málaga', province: 'Málaga', valid: true },
    '48001': { city: 'Bilbao', province: 'Vizcaya', valid: true },
    '50001': { city: 'Zaragoza', province: 'Zaragoza', valid: true },
    '15001': { city: 'A Coruña', province: 'A Coruña', valid: true },
    '30001': { city: 'Murcia', province: 'Murcia', valid: true },
    '35001': { city: 'Las Palmas', province: 'Las Palmas', valid: true },
}
