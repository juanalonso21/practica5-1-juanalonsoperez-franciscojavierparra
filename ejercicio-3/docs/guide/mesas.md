# Gestión de Mesas e Interactividad

El sistema utiliza componentes dinámicos para representar el restaurante.

## Lógica de Selección

La selección de mesas se gestiona mediante un estado centralizado que verifica:

- Capacidad de la mesa vs Número de comensales.
- Conflictos de horario con otras reservas.

## Componentes

- `TimeSlotSelector`: Maneja el tramo horario.
- `RestaurantLayout`: Renderiza el mapa SVG de las mesas.
- `TableIcon`: Representa individualmente cada mesa y su estado.
