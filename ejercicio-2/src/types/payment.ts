export type PaymentMethod = 'card' | 'paypal' | 'transfer' | 'bizum'

export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown'

export interface CardPayment {
    cardNumber: string
    cardHolder: string
    expiryDate: string
    cvv: string
    cardType: CardType
}

export interface PayPalPayment {
    email: string
}

export interface TransferPayment {
    reference: string
}

export interface BizumPayment {
    phone: string
}

export interface PaymentData {
    method: PaymentMethod
    card: CardPayment
    paypal: PayPalPayment
    transfer: TransferPayment
    bizum: BizumPayment
}

export function createEmptyPayment(): PaymentData {
    return {
        method: 'card',
        card: { cardNumber: '', cardHolder: '', expiryDate: '', cvv: '', cardType: 'unknown' },
        paypal: { email: '' },
        transfer: { reference: '' },
        bizum: { phone: '' },
    }
}
