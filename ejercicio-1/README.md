# Ejercicio 1: Formulario de Reserva de Eventos con Validaciones Regex

Aplicación Vue.js para gestionar reservas de eventos mediante un formulario completo con múltiples tipos de inputs y validaciones personalizadas usando expresiones regulares.

## Descripción

Sistema de reservas para una empresa organizadora de eventos. El formulario recopila información detallada del cliente, valida todos los campos en tiempo real y muestra mensajes de error claros.

## Tecnologías

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** (tipado estricto)
- **Vite** (build tool)
- **Vitest** (testing)

## Instalación

```sh
# Clonar el repositorio e ir al directorio del ejercicio
cd ejercicio-1

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
│   ├── ReservationForm.vue     # Componente principal del formulario
│   ├── FormInput.vue           # Input de texto reutilizable
│   ├── FormSelect.vue          # Select reutilizable
│   ├── FormCheckbox.vue        # Checkbox reutilizable
│   ├── FormRadio.vue           # Radio buttons reutilizable
│   ├── ErrorMessage.vue        # Componente para mostrar errores
│   └── __tests__/
│       └── validators.spec.ts  # Tests de validaciones y regex
├── composables/
│   ├── useValidation.ts        # Lógica de validación con regex
│   └── useFormState.ts         # Gestión del estado del formulario
├── types/
│   └── reservation.ts          # Interfaces TypeScript
└── utils/
    ├── validators.ts           # Funciones de validación
    └── regex.ts                # Expresiones regulares
```

## Campos del Formulario

### Datos Personales

| Campo | Tipo | Validación | Regex |
|-------|------|------------|-------|
| Nombre completo | `text` | Solo letras, espacios y tildes (3-50 chars) | `/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/` |
| NIF/NIE | `text` | Formato español + validación de letra | `/^[0-9]{8}[A-Z]$\|^[XYZ][0-9]{7}[A-Z]$/` |
| Teléfono móvil | `tel` | 9 dígitos, empieza por 6, 7 o 9 | `/^[679][0-9]{8}$/` |
| Email | `email` | Formato de email válido | `/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` |

### Detalles del Evento

| Campo | Tipo | Validación |
|-------|------|------------|
| Tipo de evento | `select` | Obligatorio (Boda, Cumpleaños, Corporativo, Conferencia, Otro) |
| Fecha del evento | `date` | Futura (mín. 7 días, máx. 1 año) |
| Hora de inicio | `time` | Entre 08:00 y 23:00 |
| Nº de asistentes | `number` + `range` | 10-500 personas (sincronizados) |

### Servicios Adicionales

| Campo | Tipo | Validación |
|-------|------|------------|
| Opciones de catering | `checkbox` (múltiple) | Al menos una opción seleccionada |
| Presupuesto | `radio` | Obligatorio (Económico, Estándar, Premium, Luxury) |
| Comentarios | `textarea` | Máx. 500 caracteres, no solo espacios (opcional) |
| Términos y condiciones | `checkbox` | Obligatorio para enviar |

## Validaciones en Tiempo Real

- **Mientras escribe**: Validación con debounce de 500ms, mensajes de error específicos bajo cada campo con colores (rojo error / verde válido) e iconos (✓ / ✗)
- **Al perder foco (blur)**: Validación de campos obligatorios vacíos
- **General**: Botón "Enviar" deshabilitado si hay errores. Al hacer submit, valida todos los campos y hace scroll al primer error

## Composables

### `useValidation(formData)`

Gestiona la validación reactiva del formulario:
- `validateField(field)`: Valida un campo individual
- `validateFieldDebounced(field)`: Validación con debounce 500ms
- `validateOnBlur(field)`: Validación al perder foco
- `validateAll()`: Valida todos los campos, devuelve `boolean`
- `firstErrorField()`: Devuelve el primer campo con error
- `isFormValid`: Computed — `true` si todo es válido
- `progress`: Computed — porcentaje del formulario completado
- `clearErrors()`: Limpia todos los errores

### `useFormState()`

Gestiona el estado del formulario con persistencia:
- `formData`: Estado reactivo del formulario
- `resetForm()`: Limpia el formulario y borra el borrador de localStorage

## Funcionalidades Adicionales

- **Resumen de reserva**: Muestra los datos válidos en tiempo real debajo del formulario
- **Contador de caracteres**: Para el campo de comentarios
- **Indicador de progreso**: Porcentaje del formulario completado correctamente
- **Botón de limpiar**: Reset completo del formulario
- **Persistencia local**: Guarda borrador automáticamente en `localStorage`

## Tests

Ejecutar con:

```sh
pnpm test:unit
```

Los tests cubren:
- **Tests de regex**: Validación de cada expresión regular (`NAME_REGEX`, `NIF_REGEX`, `PHONE_REGEX`, `EMAIL_REGEX`)
- **Tests de validadores**: Cada función de validación individual (`validateFullName`, `validateNIF`, `validatePhone`, `validateEmail`, `validateEventDate`, `validateStartTime`, `validateAttendees`, `validateCatering`, `validateBudget`, `validateComments`, `validateTerms`)
- Casos válidos e inválidos para cada campo
- Validación de letra correcta del NIF

## API de Componentes

### `FormInput`
- **Props**: `label`, `modelValue`, `type`, `error`, `id`, `placeholder`
- **Eventos**: `update:modelValue`, `blur`

### `FormSelect`
- **Props**: `label`, `modelValue`, `options`, `error`, `id`
- **Eventos**: `update:modelValue`, `blur`

### `FormCheckbox`
- **Props**: `label`, `modelValue`, `options`, `error`
- **Eventos**: `update:modelValue`

### `FormRadio`
- **Props**: `label`, `modelValue`, `options`, `error`
- **Eventos**: `update:modelValue`

### `ErrorMessage`
- **Props**: `error` (objeto `FieldValidation`)
