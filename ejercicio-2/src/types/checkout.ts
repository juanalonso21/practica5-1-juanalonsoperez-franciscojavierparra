export interface BillingData {
    fullName: string
    nif: string
    email: string
    phone: string
    address: string
    postalCode: string
    city: string
    province: string
    country: string
}

export interface ShippingData {
    sameAsBilling: boolean
    recipientName: string
    address: string
    postalCode: string
    city: string
    province: string
    country: string
    contactPhone: string
    deliveryInstructions: string
}

export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

export interface CheckoutState {
    billing: BillingData
    shipping: ShippingData
    payment: import('./payment').PaymentData
    discountCode: string
    discountPercent: number
    termsAccepted: boolean
    privacyAccepted: boolean
    newsletterOptIn: boolean
    currentStep: number
    cart: CartItem[]
}

export function createEmptyBilling(): BillingData {
    return {
        fullName: '',
        nif: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        province: '',
        country: 'es',
    }
}

export function createEmptyShipping(): ShippingData {
    return {
        sameAsBilling: true,
        recipientName: '',
        address: '',
        postalCode: '',
        city: '',
        province: '',
        country: 'es',
        contactPhone: '',
        deliveryInstructions: '',
    }
}

// Carrito de ejemplo simulado
export function createSampleCart(): CartItem[] {
    return [
        { id: 1, name: 'Camiseta básica', price: 19.99, quantity: 2, image: '' },
        { id: 2, name: 'Pantalón vaquero', price: 49.99, quantity: 1, image: '' },
        { id: 3, name: 'Zapatillas deportivas', price: 79.99, quantity: 1, image: '' },
    ]
}
