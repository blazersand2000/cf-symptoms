import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSymptomsStore = defineStore('symptoms', () => {
  const symptoms = computed(() => {
   const possibleSymptoms: { symptom: string; icon: string }[] = [
      { symptom: 'Chest Congestion', icon: 'mdi-liquid-spot' },
      { symptom: 'Shortness of Breath', icon: 'mdi-lungs' },
      { symptom: 'Coughing', icon: 'mdi-account-voice' },
      { symptom: 'Wheezing', icon: 'mdi-weather-dust' },
      { symptom: 'Fatigue', icon: 'mdi-eye-closed' },
      { symptom: 'Fever', icon: 'mdi-emoticon-sick' }
    ]
    return possibleSymptoms;
  })

  return { symptoms }
})
