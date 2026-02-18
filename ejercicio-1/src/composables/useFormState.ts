import { reactive, watch } from 'vue'
import { createEmptyFormData } from '@/types/reservation'
import type { ReservationFormData } from '@/types/reservation'

const STORAGE_KEY = 'reservation-draft'

export function useFormState() {
    // Intentar recuperar borrador del localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial = saved ? JSON.parse(saved) : createEmptyFormData()
    const formData = reactive<ReservationFormData>(initial)

    // Persistir cambios automáticamente
    watch(
        () => ({ ...formData }),
        (newData) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
        },
        { deep: true },
    )

    function resetForm() {
        const empty = createEmptyFormData()
        Object.assign(formData, empty)
        localStorage.removeItem(STORAGE_KEY)
    }

    return { formData, resetForm }
}
