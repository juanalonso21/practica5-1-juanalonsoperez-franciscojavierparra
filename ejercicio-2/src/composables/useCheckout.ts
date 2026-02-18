import { reactive, computed, watch } from 'vue'
import { createEmptyBilling, createEmptyShipping, createSampleCart } from '@/types/checkout'
import type { BillingData, ShippingData, CartItem } from '@/types/checkout'
import { createEmptyPayment } from '@/types/payment'
import type { PaymentData } from '@/types/payment'
import { calculateShipping } from '@/services/checkoutService'

const STORAGE_KEY = 'checkout-draft'

interface CheckoutData {
    billing: BillingData
    shipping: ShippingData
    payment: PaymentData
    discountCode: string
    discountPercent: number
    termsAccepted: boolean
    privacyAccepted: boolean
    newsletterOptIn: boolean
    cart: CartItem[]
}

export function useCheckout() {
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial: CheckoutData = saved
        ? JSON.parse(saved)
        : {
            billing: createEmptyBilling(),
            shipping: createEmptyShipping(),
            payment: createEmptyPayment(),
            discountCode: '',
            discountPercent: 0,
            termsAccepted: false,
            privacyAccepted: false,
            newsletterOptIn: false,
            cart: createSampleCart(),
        }

    const state = reactive<CheckoutData>(initial)

    // Persistir automáticamente
    watch(
        () => ({ ...state }),
        (newState) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
        },
        { deep: true },
    )

    const subtotal = computed(() =>
        state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    )

    const shippingCost = computed(() => {
        const cp = state.shipping.sameAsBilling
            ? state.billing.postalCode
            : state.shipping.postalCode
        return calculateShipping(cp)
    })

    const discountAmount = computed(() => (subtotal.value * state.discountPercent) / 100)

    const total = computed(() => subtotal.value - discountAmount.value + shippingCost.value)

    function applyDiscount(code: string, percent: number) {
        state.discountCode = code
        state.discountPercent = percent
    }

    function saveDraft() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }

    function clearData() {
        Object.assign(state, {
            billing: createEmptyBilling(),
            shipping: createEmptyShipping(),
            payment: createEmptyPayment(),
            discountCode: '',
            discountPercent: 0,
            termsAccepted: false,
            privacyAccepted: false,
            newsletterOptIn: false,
            cart: createSampleCart(),
        })
        localStorage.removeItem(STORAGE_KEY)
    }

    return {
        state,
        subtotal,
        shippingCost,
        discountAmount,
        total,
        applyDiscount,
        saveDraft,
        clearData,
    }
}
