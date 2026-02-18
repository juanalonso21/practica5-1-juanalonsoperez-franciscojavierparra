// Expresiones regulares para validaciones del formulario de reserva

// Nombre: solo letras, espacios y tildes, 3-50 caracteres
export const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/

// NIF/NIE: 8 dígitos + letra o letra(X,Y,Z) + 7 dígitos + letra
export const NIF_REGEX = /^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/

// Teléfono español: 9 dígitos, empieza por 6, 7 o 9
export const PHONE_REGEX = /^[679][0-9]{8}$/

// Email válido
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Comentarios: no solo espacios
export const NOT_ONLY_SPACES_REGEX = /\S/
