import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ReservationForm from '@/components/ReservationForm.vue'
import { useRestaurantStore } from '@/stores/useRestaurantStore'

describe('ReservationForm (Test C)', () => {
    it('no emite submit si comensales superan capacidad de la mesa', async () => {
        setActivePinia(createPinia())
        const store = useRestaurantStore()
        store.selectTable(1) // Mesa 1 tiene capacidad 2

        const wrapper = mount(ReservationForm, {
            props: {
                selectedTable: { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 10, y: 10 } },
            },
        })

        // Rellenar nombre y email
        await wrapper.find('#customerName').setValue('Juan Test')
        await wrapper.find('#customerEmail').setValue('juan@test.com')

        // Poner 5 comensales (supera capacidad de 2)
        await wrapper.find('#peopleCount').setValue(5)

        // Enviar formulario
        await wrapper.find('form').trigger('submit')

        // El formulario no debió hacer la reserva
        expect(store.reservations.length).toBe(0)

        // Debe aparecer un mensaje de error
        expect(wrapper.find('.error').exists()).toBe(true)
    })

    it('hace reserva correcta si datos son válidos', async () => {
        setActivePinia(createPinia())
        const store = useRestaurantStore()
        store.selectTable(1)

        const wrapper = mount(ReservationForm, {
            props: {
                selectedTable: { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 10, y: 10 } },
            },
        })

        await wrapper.find('#customerName').setValue('Ana García')
        await wrapper.find('#customerEmail').setValue('ana@test.com')
        await wrapper.find('#peopleCount').setValue(2)
        await wrapper.find('form').trigger('submit')

        expect(store.reservations.length).toBe(1)
        expect(wrapper.find('.success').exists()).toBe(true)
    })

    it('muestra error si nombre está vacío', async () => {
        setActivePinia(createPinia())
        const store = useRestaurantStore()
        store.selectTable(1)

        const wrapper = mount(ReservationForm, {
            props: {
                selectedTable: { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 10, y: 10 } },
            },
        })

        await wrapper.find('#customerEmail').setValue('test@test.com')
        await wrapper.find('#peopleCount').setValue(1)
        await wrapper.find('form').trigger('submit')

        expect(wrapper.find('.error').exists()).toBe(true)
        expect(store.reservations.length).toBe(0)
    })
})
