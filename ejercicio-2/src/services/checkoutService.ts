import type { CheckoutState } from '@/types/checkout'

// Simular envío de pedido
export async function submitOrder(data: CheckoutState): Promise<{ success: boolean; orderId: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase()
    console.log('Pedido enviado:', orderId, data)
    return { success: true, orderId }
}

// Calcular gastos de envío según dirección
export function calculateShipping(postalCode: string): number {
    if (!postalCode) return 0
    // Envío estándar por defecto
    const cp = parseInt(postalCode.substring(0, 2))
    if (cp >= 35 && cp <= 38) return 9.99 // Canarias
    if (cp >= 7 && cp <= 7) return 7.99 // Baleares
    return 4.99
}
