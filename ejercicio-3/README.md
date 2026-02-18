# Ejercicio 3: Sistema de Gestión de Reservas "VueDining"

SPA para la gestión de reservas de un restaurante, con énfasis en la gestión de estado global con Pinia, comunicación entre componentes y accesibilidad (A11y).

## Descripción

Frontend de un sistema de reservas que gestiona mesas, franjas horarias y reservas de clientes. Utiliza Pinia como única fuente de verdad, con un mapa visual interactivo de mesas que muestra la disponibilidad en tiempo real según la franja horaria seleccionada.

## Tecnologías

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** (tipado estricto)
- **Vite** (build tool)
- **Pinia** (gestión de estado)
- **Vitest** (testing)

## Instalación

```sh
# Clonar el repositorio e ir al directorio del ejercicio
cd ejercicio-3

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Ejecutar tests
pnpm test:unit

# Build de producción
pnpm build
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── TimeSlotSelector.vue        # Selector de franjas horarias
│   ├── RestaurantLayout.vue        # Layout principal del restaurante
│   ├── TableMap.vue                # Mapa de mesas (padre)
│   ├── TableComponent.vue          # Mesa individual (hijo)
│   ├── ReservationForm.vue         # Formulario de reserva
│   └── __tests__/
│       ├── store.spec.ts           # Tests del store Pinia
│       ├── table.spec.ts           # Tests del componente Table
│       └── reservationForm.spec.ts # Tests del formulario
├── stores/
│   └── useRestaurantStore.ts       # Store de Pinia (lógica de negocio)
└── types/
    └── index.ts                    # Interfaces TypeScript
```

## Arquitectura

### Árbol de Componentes

```
App.vue
├── TimeSlotSelector.vue    (Lee/Escribe activeTimeSlot en Pinia)
└── RestaurantLayout.vue
    ├── TableMap.vue         (Itera v-for tables)
    │   └── TableComponent.vue  (Props: tableData, status | Emits: select)
    └── ReservationForm.vue  (Props: selectedTable | Emits: submit)
```

### Diseño de Datos (Interfaces)

```typescript
type TimeSlot = '13:00' | '14:00' | '15:00' | '20:00' | '21:00'

interface Table {
  id: number
  label: string
  capacity: number
  position: { x: number; y: number }
}

interface Reservation {
  id: string
  tableId: number
  timeSlot: TimeSlot
  customerName: string
  customerEmail: string
  peopleCount: number
}

type TableStatus = 'free' | 'occupied' | 'selected'
```

### Diagrama de Relaciones

```
RestaurantStore "1" ──── "muchas" Table     : contiene
RestaurantStore "1" ──── "muchas" Reservation : gestiona
Reservation ────────────────────> Table     : referencia a
```

## Store de Pinia (`useRestaurantStore`)

Toda la lógica de negocio reside en el store. Los componentes solo "pintan" datos o "despachan" acciones.

### State

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `tables` | `Table[]` | Lista de 10 mesas con ID, label, capacidad y posición |
| `reservations` | `Reservation[]` | Lista de reservas confirmadas |
| `activeTimeSlot` | `TimeSlot` | Franja horaria seleccionada (por defecto `'14:00'`) |
| `selectedTableId` | `number \| null` | ID de la mesa seleccionada por el usuario |

### Actions

| Acción | Descripción |
|--------|-------------|
| `addReservation(data)` | Valida que la mesa exista, que esté libre y que no supere la capacidad. Previene overbooking. Devuelve `boolean` |
| `setTimeSlot(slot)` | Cambia la franja horaria activa y deselecciona la mesa |
| `selectTable(tableId)` | Selecciona una mesa (solo si está libre) |
| `deselectTable()` | Deselecciona la mesa actual |

### Getters (Computed)

| Getter | Descripción |
|--------|-------------|
| `isTableAvailable(id)` | Comprueba si la mesa está libre en el slot activo |
| `getTableStatus(id)` | Devuelve el estado: `'free'`, `'occupied'` o `'selected'` |
| `tablesWithStatus` | Mesas con su estado calculado |
| `selectedTable` | La mesa seleccionada actualmente o `null` |

## Componentes

### TimeSlotSelector

Muestra botones con franjas horarias fijas (13:00, 14:00, 15:00, 20:00, 21:00). Al cambiar la hora, el mapa de mesas reacciona automáticamente mostrando la disponibilidad real.

### TableMap (Padre)

Renderiza la planta del restaurante iterando sobre las mesas del store.

### TableComponent (Hijo)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `tableData` | `Table & { status: TableStatus }` | Datos de la mesa con su estado |

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `select` | `number` (ID de la mesa) | Se emite al hacer click en la mesa |

**Visualización por estado:**
- 🟢 **Libre** (`free`): Color verde, clickable
- 🔴 **Ocupada** (`occupied`): Color rojo, botón deshabilitado
- 🔵 **Seleccionada** (`selected`): Color azul

**Accesibilidad:**
- Cada mesa es un `<button>` (no un `<div>`)
- `aria-label` descriptivo: *"Mesa 5, para 4 personas, estado: Ocupada"*
- Navegable con Tab y Enter

### ReservationForm

Solo visible si hay una mesa seleccionada y libre.

| Campo | Validación |
|-------|------------|
| Nombre | Obligatorio |
| Email | Obligatorio |
| Nº comensales | No puede superar la capacidad de la mesa seleccionada |

Al enviar, comunica los datos al store para procesar la reserva.

## Tests

Ejecutar con:

```sh
pnpm test:unit
```

### Test A: Lógica de Negocio (store.spec.ts)

- Estado inicial: 10 mesas, 0 reservas, slot por defecto `'14:00'`
- `setTimeSlot`: Cambia el slot activo y deselecciona la mesa
- `isTableAvailable`: Mesa libre si no hay reserva, ocupada tras reservar
- **Evitar overbooking**: Segunda reserva en misma mesa y hora devuelve `false`; permite reservas en la misma mesa a distinta hora
- **Validación de capacidad**: Rechaza si comensales superan la capacidad
- `selectTable`: Selecciona mesa libre, no selecciona mesa ocupada
- `getTableStatus`: Devuelve `'free'`, `'selected'` u `'occupied'` correctamente

### Test B: Componente Table (table.spec.ts)

- Muestra clase CSS `occupied` cuando `status` es `'occupied'`
- `aria-label` contiene nombre de mesa, capacidad y estado
- Emite evento `select` con el ID al hacer click
- Botón deshabilitado si la mesa está ocupada

### Test C: Formulario de Reserva (reservationForm.spec.ts)

- **No** emite submit si comensales superan capacidad → muestra error
- Hace reserva correcta si datos son válidos → muestra éxito
- Muestra error si el nombre está vacío
