import { describe, it, expect } from 'vitest'
import { luhnCheck, detectCardType, formatCardNumber, getCvvLength, isExpiryValid } from '@/utils/creditCard'

describe('Credit Card Utilities', () => {
    describe('luhnCheck', () => {
        it('valida Visa de prueba', () => {
            expect(luhnCheck('4532015112830366')).toBe(true)
        })
        it('valida Mastercard de prueba', () => {
            expect(luhnCheck('5425233430109903')).toBe(true)
        })
        it('valida Amex de prueba', () => {
            expect(luhnCheck('374245455400126')).toBe(true)
        })
        it('rechaza número inválido', () => {
            expect(luhnCheck('1234567890123456')).toBe(false)
        })
        it('maneja espacios en el número', () => {
            expect(luhnCheck('4532 0151 1283 0366')).toBe(true)
        })
    })

    describe('detectCardType', () => {
        it('detecta Visa', () => {
            expect(detectCardType('4532015112830366')).toBe('visa')
        })
        it('detecta Mastercard', () => {
            expect(detectCardType('5425233430109903')).toBe('mastercard')
        })
        it('detecta Amex', () => {
            expect(detectCardType('374245455400126')).toBe('amex')
        })
        it('devuelve unknown para otros', () => {
            expect(detectCardType('9999999999999999')).toBe('unknown')
        })
    })

    describe('formatCardNumber', () => {
        it('formatea con espacios cada 4 dígitos', () => {
            expect(formatCardNumber('4532015112830366')).toBe('4532 0151 1283 0366')
        })
        it('elimina caracteres no numéricos', () => {
            expect(formatCardNumber('4532-0151-1283-0366')).toBe('4532 0151 1283 0366')
        })
    })

    describe('getCvvLength', () => {
        it('3 dígitos para Visa', () => {
            expect(getCvvLength('visa')).toBe(3)
        })
        it('3 dígitos para Mastercard', () => {
            expect(getCvvLength('mastercard')).toBe(3)
        })
        it('4 dígitos para Amex', () => {
            expect(getCvvLength('amex')).toBe(4)
        })
    })

    describe('isExpiryValid', () => {
        it('acepta fecha futura', () => {
            expect(isExpiryValid('12/30')).toBe(true)
        })
        it('rechaza fecha pasada', () => {
            expect(isExpiryValid('01/20')).toBe(false)
        })
        it('rechaza formato inválido', () => {
            expect(isExpiryValid('13/25')).toBe(false)
            expect(isExpiryValid('abc')).toBe(false)
        })
    })
})
