<template>
  <!-- <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
            hide-details
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form> -->

  <!-- <v-card height="200px" class="d-flex justify-center align-center"> -->
  <v-container style="max-width: 800px; height: 400px">
    <v-row>
      <v-col>
        <!-- <v-card class="mx-auto mt-4" max-width="400"> -->
        <v-card>
          <v-window v-model="window" show-arrows>
            <v-container>
              <v-row>
                <v-col cols="2"> </v-col>
                <v-col cols="8">
                  <v-window-item style="height: 500px">
                    <v-card-text>
                      <h2 class="text-h6 mb-2">Choose all symptoms observed today</h2>

                      <v-chip-group v-model="observedSymptomKeys" column multiple>
                        <v-chip
                          v-for="(symptom, name) in possibleSymptoms"
                          :key="name"
                          :value="name"
                          filter
                          :append-icon="symptom.icon"
                        >
                          {{ symptom.displayName }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-window-item>
                  <v-window-item style="height: 500px">
                    <v-card-text>
                      <h2 class="text-h6 mb-2">Were any retractions observed?</h2>
                    </v-card-text>
                    <v-checkbox
                      v-for="(retraction, name) in possibleMeasurements"
                      :key="name"
                      v-model="observedMeasurementKeys"
                      :label="retraction.displayName"
                      :value="name"
                    ></v-checkbox>
                  </v-window-item>
                  <v-window-item v-if="showFever" style="height: 500px">
                    <v-card-text>
                      <h2 class="text-h6 mb-2">What was the fever temperature?</h2>
                    </v-card-text>
                    <v-text-field
                      v-model="temperature"
                      label="Temperature"
                      type="number"
                      step=".1"
                      min="0"
                      suffix="°F"
                    ></v-text-field>
                  </v-window-item>
                  <v-window-item style="height: 500px">
                    <v-btn @click="submit"> Submit Symptoms </v-btn>
                  </v-window-item>
                </v-col>
                <v-col cols="2"> </v-col>
              </v-row>
            </v-container>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-btn @click="click">Submit Symptoms</v-btn> -->
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useObservations } from "@/composables/observations";
import { type NewConcreteObservation, type Symptoms, type ConcreteObservation, type ConcreteObservationItem, type ObservationInfoItem, type ObservationInfo, type Measurements, defaultConcreteObservation } from '@/types/types';

const emit = defineEmits<{
  submit: []
}>()

const { observationInfo, addObservation } = useObservations()

const possibleSymptoms = computed(() => observationInfo.value.symptoms)
const possibleMeasurements = computed(() => observationInfo.value.measurements)

const window = ref(0)

const observedSymptomKeys = ref<(keyof Symptoms<ConcreteObservationItem>)[]>([])
const observedSymptoms = computed(() => {
   const symptoms = defaultConcreteObservation().symptoms
   observedSymptomKeys.value.forEach(key => {
      symptoms[key].observed = true
   })
   if (symptoms.fever.observed) {
      symptoms.fever.temperature = temperature.value
   }
   return symptoms
})

const observedMeasurementKeys = ref<(keyof Measurements<ConcreteObservationItem>)[]>([])
const observedMeasurements = computed(() => {
   const measurements = defaultConcreteObservation().measurements
   observedMeasurementKeys.value.forEach(key => {
      measurements[key] = {
         observed: true
      }
   })
   return measurements
})

const observation = computed<NewConcreteObservation>(() => ({
   measurements: observedMeasurements.value,
   symptoms: observedSymptoms.value
}))

const showFever = computed(() =>
  observedSymptoms.value.fever.observed
)

const temperature = ref()

function submit() {
  addObservation(observation.value)
  emit('submit')
}
</script>
<style scoped></style>
