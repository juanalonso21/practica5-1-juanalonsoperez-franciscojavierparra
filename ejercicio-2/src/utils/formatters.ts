// Formatear precio
export function formatPrice(price: number): string {
    return price.toFixed(2) + '€'
}

// Formatear número de tarjeta para mostrar (ocultar dígitos)
export function maskCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '')
    if (cleaned.length < 4) return cardNumber
    return '•••• •••• •••• ' + cleaned.slice(-4)
}
