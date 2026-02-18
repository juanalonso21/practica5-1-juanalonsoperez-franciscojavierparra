# Implementación Técnica

El checkout utiliza un patrón de diseño de "Asistente" (Wizard).

## Gestión del Estado

Utilizamos **Pinia** para mantener los datos a lo largo de los diferentes pasos:

- `checkoutStore`: Almacena la información de envío y pago.
- `cartStore`: Gestiona los artículos del carrito.

## Enrutamiento

El `Vue Router` se encarga de cambiar entre las vistas de cada paso, manteniendo una URL limpia y permitiendo la navegación hacia atrás del navegador.

```ts
const routes = [
  { path: '/checkout/envio', component: ShippingStep },
  // ...
]
```
