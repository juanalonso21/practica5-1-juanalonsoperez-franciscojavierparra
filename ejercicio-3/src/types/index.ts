// Tipos para el sistema de reservas VueDining

export type TimeSlot = '13:00' | '14:00' | '15:00' | '20:00' | '21:00'

export const TIME_SLOTS: TimeSlot[] = ['13:00', '14:00', '15:00', '20:00', '21:00']

export interface Table {
    id: number
    label: string
    capacity: number
    position: { x: number; y: number }
}

export interface Reservation {
    id: string
    tableId: number
    timeSlot: TimeSlot
    customerName: string
    customerEmail: string
    peopleCount: number
}

export type TableStatus = 'free' | 'occupied' | 'selected'

// Datos iniciales de mesas del restaurante
export const INITIAL_TABLES: Table[] = [
    { id: 1, label: 'Mesa 1', capacity: 2, position: { x: 10, y: 10 } },
    { id: 2, label: 'Mesa 2', capacity: 4, position: { x: 30, y: 10 } },
    { id: 3, label: 'Mesa 3', capacity: 6, position: { x: 50, y: 10 } },
    { id: 4, label: 'Mesa 4', capacity: 2, position: { x: 70, y: 10 } },
    { id: 5, label: 'Mesa 5', capacity: 4, position: { x: 10, y: 40 } },
    { id: 6, label: 'Mesa 6', capacity: 8, position: { x: 30, y: 40 } },
    { id: 7, label: 'Mesa 7', capacity: 4, position: { x: 50, y: 40 } },
    { id: 8, label: 'Mesa 8', capacity: 2, position: { x: 70, y: 40 } },
    { id: 9, label: 'Mesa 9', capacity: 6, position: { x: 20, y: 70 } },
    { id: 10, label: 'Mesa 10', capacity: 10, position: { x: 50, y: 70 } },
]
