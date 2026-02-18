import { ref, computed } from 'vue'

export function useWizardNavigation(totalSteps: number = 4) {
    const currentStep = ref(1)

    const isFirstStep = computed(() => currentStep.value === 1)
    const isLastStep = computed(() => currentStep.value === totalSteps)

    function nextStep() {
        if (currentStep.value < totalSteps) {
            currentStep.value++
        }
    }

    function prevStep() {
        if (currentStep.value > 1) {
            currentStep.value--
        }
    }

    function goToStep(step: number) {
        if (step >= 1 && step <= totalSteps) {
            currentStep.value = step
        }
    }

    return {
        currentStep,
        isFirstStep,
        isLastStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
    }
}
