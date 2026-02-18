# Ejercicio 2: Checkout de Tienda Online con VeeValidate

Proceso de checkout completo para una tienda online con validaciones avanzadas mediante VeeValidate + Yup, incluyendo validación asíncrona y formulario multi-paso (wizard).

## Descripción

Sistema de checkout profesional con 4 pasos que guía al usuario desde la introducción de datos de facturación hasta la confirmación final del pedido. Incluye validaciones complejas (algoritmo de Luhn, validación de NIF, validaciones asíncronas de código postal y descuentos) y experiencia de usuario fluida.

## Tecnologías

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** (tipado estricto)
- **Vite** (build tool)
- **VeeValidate** + **Yup** (validación de formularios)
- **Vitest** (testing)

## Instalación

```sh
# Clonar el repositorio e ir al directorio del ejercicio
cd ejercicio-2

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
│   ├── checkout/
│   │   ├── CheckoutWizard.vue      # Contenedor principal del wizard
│   │   ├── StepIndicator.vue       # Barra de progreso visual
│   │   ├── Step1Billing.vue        # Paso 1: Datos de facturación
│   │   ├── Step2Shipping.vue       # Paso 2: Dirección de envío
│   │   ├── Step3Payment.vue        # Paso 3: Método de pago
│   │   ├── Step4Summary.vue        # Paso 4: Resumen y confirmación
│   │   └── NavigationButtons.vue   # Botones de navegación
│   ├── payment/
│   │   ├── CreditCardForm.vue      # Formulario de tarjeta de crédito
│   │   ├── PayPalForm.vue          # Formulario de PayPal
│   │   ├── TransferForm.vue        # Formulario de transferencia
│   │   └── BizumForm.vue           # Formulario de Bizum
│   └── common/
│       ├── FormField.vue           # Wrapper con VeeValidate
│       ├── DiscountCode.vue        # Componente de código de descuento
│       └── OrderSummary.vue        # Resumen del pedido
├── composables/
│   ├── useCheckout.ts              # Estado global del checkout
│   ├── useWizardNavigation.ts      # Lógica de navegación del wizard
│   └── useValidationSchemas.ts     # Esquemas de validación Yup
├── services/
│   ├── validationService.ts        # Validaciones asíncronas
│   └── checkoutService.ts          # Simulación de API
├── types/
│   ├── checkout.ts                 # Interfaces de checkout
│   ├── payment.ts                  # Interfaces de pago
│   └── address.ts                  # Interfaces de dirección
└── utils/
    ├── creditCard.ts               # Algoritmo de Luhn, detección de tipo
    └── formatters.ts               # Formateo de datos
```

## Estructura del Wizard (4 Pasos)

### Paso 1: Datos de Facturación

| Campo | Validación |
|-------|------------|
| Nombre completo | Obligatorio, mín. 3 caracteres, solo letras |
| NIF/CIF | Obligatorio, formato válido, validación de letra |
| Email | Obligatorio, formato válido |
| Teléfono | Obligatorio, formato español (9 dígitos, empieza por 6/7/9) |
| Dirección | Obligatorio |
| Código postal | Obligatorio, 5 dígitos, validación asíncrona |
| Ciudad | Obligatorio, autocompletar según CP |
| Provincia | Obligatorio, autocompletar según CP |
| País | Select, por defecto España |

### Paso 2: Dirección de Envío

- Checkbox **"Misma dirección que facturación"**: si no está marcado, se muestran los campos de envío (nombre destinatario, dirección, CP, ciudad, provincia, país, teléfono de contacto, instrucciones de entrega)
- Validación condicional: campos solo obligatorios si `sameAsBilling = false`

### Paso 3: Método de Pago

| Método | Campos específicos |
|--------|-------------------|
| **Tarjeta** | Número (Luhn), nombre titular, fecha expiración (MM/YY futura), CVV (3-4 dígitos según tipo) |
| **PayPal** | Email de PayPal |
| **Transferencia** | Datos bancarios + referencia |
| **Bizum** | Teléfono móvil (formato español) |

- **Detección automática** del tipo de tarjeta (Visa, Mastercard, Amex)
- **Código de descuento**: Validación asíncrona con códigos válidos: `BIENVENIDO10` (10%), `VERANO20` (20%), `VIP30` (30%)

### Paso 4: Resumen y Confirmación

- Resumen completo: productos, facturación, envío, pago, totales
- Checkboxes obligatorios: términos y condiciones, política de privacidad
- Checkbox opcional: newsletter
- Botón "Confirmar pedido"

## Validaciones con VeeValidate

Se utilizan esquemas **Yup** para cada paso del wizard:

- `billingSchema`: Validación del paso 1 (nombre, NIF, email, teléfono, dirección, CP)
- `shippingSchema`: Validación condicional del paso 2 (`.when('sameAsBilling', ...)`)
- `getPaymentSchema(method)`: Esquema dinámico según método de pago seleccionado
- `confirmationSchema`: Validación del paso 4 (checkboxes obligatorios)

### Validaciones Especiales

- **Algoritmo de Luhn**: Implementado en `creditCard.ts` para verificar números de tarjeta
- **Detección de tarjeta**: Por prefijo del número (4=Visa, 5=MC, 3=Amex)
- **CVV dinámico**: 3 dígitos para Visa/MC, 4 para Amex
- **Validación asíncrona de CP**: Simula llamada API, autocompleta ciudad/provincia
- **Validación de NIF**: Formato + verificación de letra correcta

## Composables

### `useCheckout()`

Estado global del checkout con persistencia en `localStorage`:
- `state`: Estado reactivo (billing, shipping, payment, cart, descuentos)
- `subtotal`: Computed — suma de productos
- `shippingCost`: Computed — coste de envío según CP
- `discountAmount`: Computed — descuento aplicado
- `total`: Computed — total final
- `applyDiscount(code, percent)`: Aplica un descuento
- `saveDraft()`: Guarda borrador explícito
- `clearData()`: Limpia todo al completar pedido

### `useWizardNavigation()`

Lógica de navegación entre pasos:
- Validación antes de avanzar
- Retroceso sin validar
- Persiste datos al navegar

### `useValidationSchemas()`

Esquemas de validación Yup para cada paso del wizard.

## Navegación del Wizard

- **Barra de progreso visual**: Indica paso actual y completados
- **"Siguiente"**: Solo habilitado si el paso actual es válido
- **"Anterior"**: Siempre disponible (excepto paso 1)
- **"Guardar borrador"**: Disponible en cualquier paso
- **Indicadores**: Paso actual destacado, completados con ✓, pendientes en gris

## Datos de Prueba

### Tarjetas de crédito (válidas con algoritmo de Luhn)

| Tipo | Número |
|------|--------|
| Visa | `4532015112830366` |
| Mastercard | `5425233430109903` |
| Amex | `374245455400126` |

### Códigos postales

| CP | Ciudad | Provincia |
|----|--------|-----------|
| `28001` | Madrid | Madrid |
| `08001` | Barcelona | Barcelona |
| `41001` | Sevilla | Sevilla |
| `46001` | Valencia | Valencia |

### Códigos de descuento

| Código | Descuento |
|--------|-----------|
| `BIENVENIDO10` | 10% |
| `VERANO20` | 20% |
| `VIP30` | 30% |

## Tests

Ejecutar con:

```sh
pnpm test:unit
```

Los tests cubren:
- **Algoritmo de Luhn**: Verificación con tarjetas Visa, Mastercard y Amex (válidas e inválidas)
- **Detección de tipo de tarjeta**: Determinar Visa, Mastercard, Amex o unknown por prefijo
- **Formateo de tarjeta**: Espacios cada 4 dígitos, eliminación de caracteres no numéricos
- **CVV**: Longitud correcta según tipo de tarjeta
- **Fecha de expiración**: Formato MM/YY, debe ser futura, mes válido (1-12)
