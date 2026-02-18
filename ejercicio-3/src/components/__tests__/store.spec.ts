import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

describe('useRestaurantStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    describe('Estado inicial', () => {
        it('tiene 10 mesas', () => {
            const store = useRestaurantStore()
            expect(store.tables.length).toBe(10)
        })

        it('no tiene reservas iniciales', () => {
            const store = useRestaurantStore()
            expect(store.reservations.length).toBe(0)
        })

        it('tiene slot por defecto 14:00', () => {
            const store = useRestaurantStore()
            expect(store.activeTimeSlot).toBe('14:00')
        })
    })

    describe('setTimeSlot', () => {
        it('cambia el slot activo', () => {
            const store = useRestaurantStore()
            store.setTimeSlot('21:00')
            expect(store.activeTimeSlot).toBe('21:00')
        })

        it('deselecciona la mesa al cambiar slot', () => {
            const store = useRestaurantStore()
            store.selectTable(1)
            store.setTimeSlot('20:00')
            expect(store.selectedTableId).toBeNull()
        })
    })

    describe('isTableAvailable', () => {
        it('mesa libre si no hay reserva', () => {
            const store = useRestaurantStore()
            expect(store.isTableAvailable(1)).toBe(true)
        })

        it('mesa ocupada tras reserva', () => {
            const store = useRestaurantStore()
            store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Juan',
                customerEmail: 'juan@test.com',
                peopleCount: 2,
            })
            expect(store.isTableAvailable(1)).toBe(false)
        })
    })

    describe('addReservation - Evitar Overbooking (Test A)', () => {
        it('previene overbooking en la misma mesa y hora', () => {
            const store = useRestaurantStore()

            // Primera reserva: debe funcionar
            const first = store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Ana',
                customerEmail: 'ana@test.com',
                peopleCount: 2,
            })
            expect(first).toBe(true)
            expect(store.reservations.length).toBe(1)

            // Segunda reserva en la misma mesa y hora: debe fallar
            const second = store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Pedro',
                customerEmail: 'pedro@test.com',
                peopleCount: 1,
            })
            expect(second).toBe(false)
            expect(store.reservations.length).toBe(1)
        })

        it('permite reservas en la misma mesa a distinta hora', () => {
            const store = useRestaurantStore()

            store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Ana',
                customerEmail: 'ana@test.com',
                peopleCount: 2,
            })

            const result = store.addReservation({
                tableId: 1,
                timeSlot: '21:00',
                customerName: 'Pedro',
                customerEmail: 'pedro@test.com',
                peopleCount: 2,
            })
            expect(result).toBe(true)
            expect(store.reservations.length).toBe(2)
        })
    })

    describe('Validación de capacidad', () => {
        it('rechaza si supera la capacidad de la mesa', () => {
            const store = useRestaurantStore()
            // Mesa 1 tiene capacidad 2
            const result = store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Grupo',
                customerEmail: 'grupo@test.com',
                peopleCount: 5,
            })
            expect(result).toBe(false)
        })
    })

    describe('selectTable', () => {
        it('selecciona mesa libre', () => {
            const store = useRestaurantStore()
            store.selectTable(1)
            expect(store.selectedTableId).toBe(1)
        })

        it('no selecciona mesa ocupada', () => {
            const store = useRestaurantStore()
            store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Ana',
                customerEmail: 'ana@test.com',
                peopleCount: 2,
            })
            store.selectTable(1)
            // Debe seguir null ya que la mesa está ocupada
            expect(store.selectedTableId).toBeNull()
        })
    })

    describe('getTableStatus', () => {
        it('devuelve free para mesa libre', () => {
            const store = useRestaurantStore()
            expect(store.getTableStatus(1)).toBe('free')
        })

        it('devuelve selected para mesa seleccionada', () => {
            const store = useRestaurantStore()
            store.selectTable(1)
            expect(store.getTableStatus(1)).toBe('selected')
        })

        it('devuelve occupied para mesa reservada', () => {
            const store = useRestaurantStore()
            store.addReservation({
                tableId: 1,
                timeSlot: '14:00',
                customerName: 'Ana',
                customerEmail: 'ana@test.com',
                peopleCount: 2,
            })
            expect(store.getTableStatus(1)).toBe('occupied')
        })
    })
})
