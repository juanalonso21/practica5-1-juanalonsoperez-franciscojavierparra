import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TableComponent from '@/components/TableComponent.vue'

describe('TableComponent (Test B)', () => {
    it('muestra clase occupied cuando status es occupied', () => {
        setActivePinia(createPinia())
        const wrapper = mount(TableComponent, {
            props: {
                tableData: {
                    id: 5,
                    label: 'Mesa 5',
                    capacity: 4,
                    position: { x: 10, y: 10 },
                    status: 'occupied' as const,
                },
            },
        })

        expect(wrapper.find('button').classes()).toContain('occupied')
    })

    it('tiene aria-label correcto incluyendo estado', () => {
        setActivePinia(createPinia())
        const wrapper = mount(TableComponent, {
            props: {
                tableData: {
                    id: 5,
                    label: 'Mesa 5',
                    capacity: 4,
                    position: { x: 10, y: 10 },
                    status: 'occupied' as const,
                },
            },
        })

        const ariaLabel = wrapper.find('button').attributes('aria-label')
        expect(ariaLabel).toContain('Mesa 5')
        expect(ariaLabel).toContain('4 personas')
        expect(ariaLabel).toContain('Ocupada')
    })

    it('emite evento select con el ID al hacer click', () => {
        setActivePinia(createPinia())
        const wrapper = mount(TableComponent, {
            props: {
                tableData: {
                    id: 5,
                    label: 'Mesa 5',
                    capacity: 4,
                    position: { x: 10, y: 10 },
                    status: 'free' as const,
                },
            },
        })

        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('select')).toBeTruthy()
        expect(wrapper.emitted('select')![0]).toEqual([5])
    })

    it('el botón está deshabilitado si la mesa está ocupada', () => {
        setActivePinia(createPinia())
        const wrapper = mount(TableComponent, {
            props: {
                tableData: {
                    id: 5,
                    label: 'Mesa 5',
                    capacity: 4,
                    position: { x: 10, y: 10 },
                    status: 'occupied' as const,
                },
            },
        })

        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })
})
