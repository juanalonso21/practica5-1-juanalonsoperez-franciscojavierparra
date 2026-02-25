import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Table, Reservation, TimeSlot, TableStatus } from '@/types/index'
import { INITIAL_TABLES } from '@/types/index'

export const useRestaurantStore = defineStore('restaurant', () => {
    const tables = ref<Table[]>([...INITIAL_TABLES])
    const reservations = ref<Reservation[]>([])
    const activeTimeSlot = ref<TimeSlot>('14:00')
    const selectedTableId = ref<number | null>(null)

    // Comprobar si una mesa está disponible en el slot activo
    function isTableAvailable(tableId: number): boolean {
        return !reservations.value.some(
            (r) => r.tableId === tableId && r.timeSlot === activeTimeSlot.value,
        )
    }

    // Obtener el estado de una mesa
    function getTableStatus(tableId: number): TableStatus {
        if (selectedTableId.value === tableId) return 'selected'
        if (!isTableAvailable(tableId)) return 'occupied'
        return 'free'
    }

    // Obtener las mesas con su estado actual
    const tablesWithStatus = computed(() =>
        tables.value.map((table) => ({
            ...table,
            status: getTableStatus(table.id),
        })),
    )

    // Seleccionar una mesa
    function selectTable(tableId: number) {
        if (isTableAvailable(tableId)) {
            selectedTableId.value = tableId
        }
    }

    // Deseleccionar mesa
    function deselectTable() {
        selectedTableId.value = null
    }

    // Mesa seleccionada
    const selectedTable = computed(() =>
        selectedTableId.value
            ? tables.value.find((t) => t.id === selectedTableId.value) || null
            : null,
    )

    // Cambiar el slot de tiempo activo
    function setTimeSlot(slot: TimeSlot) {
        activeTimeSlot.value = slot
        selectedTableId.value = null
    }

    // Añadir una reserva (valida que la mesa esté libre)
    function addReservation(data: Omit<Reservation, 'id'>): boolean {
        // Comprobar que la mesa existe
        const table = tables.value.find((t) => t.id === data.tableId)
        if (!table) return false

        // Comprobar que no hay overbooking
        const exists = reservations.value.some(
            (r) => r.tableId === data.tableId && r.timeSlot === data.timeSlot,
        )
        if (exists) return false

        // Comprobar que no supera la capacidad
        if (data.peopleCount > table.capacity) return false

        const reservation: Reservation = {
            ...data,
            id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        }

        reservations.value.push(reservation)
        selectedTableId.value = null
        return true
    }

    // Obtener la reserva de una mesa en el slot activo
    function getReservationForTable(tableId: number): Reservation | undefined {
        return reservations.value.find(
            (r) => r.tableId === tableId && r.timeSlot === activeTimeSlot.value,
        )
    }

    // Mesa ocupada que se está visualizando (para ver detalles)
    const viewingOccupiedTableId = ref<number | null>(null)

    function viewOccupiedTable(tableId: number) {
        viewingOccupiedTableId.value = tableId
        selectedTableId.value = null
    }

    function clearViewingTable() {
        viewingOccupiedTableId.value = null
    }

    // Cancelar una reserva existente
    function cancelReservation(reservationId: string) {
        reservations.value = reservations.value.filter((r) => r.id !== reservationId)
        viewingOccupiedTableId.value = null
    }

    const viewingReservation = computed(() =>
        viewingOccupiedTableId.value
            ? getReservationForTable(viewingOccupiedTableId.value)
            : undefined,
    )

    const viewingTable = computed(() =>
        viewingOccupiedTableId.value
            ? tables.value.find((t) => t.id === viewingOccupiedTableId.value) || null
            : null,
    )

    return {
        tables,
        reservations,
        activeTimeSlot,
        selectedTableId,
        selectedTable,
        tablesWithStatus,
        isTableAvailable,
        getTableStatus,
        selectTable,
        deselectTable,
        setTimeSlot,
        addReservation,
        getReservationForTable,
        viewingOccupiedTableId,
        viewOccupiedTable,
        clearViewingTable,
        cancelReservation,
        viewingReservation,
        viewingTable,
    }
})
