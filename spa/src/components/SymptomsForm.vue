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

                      <v-chip-group v-model="observedSymptomIndexes" column multiple>
                        <v-chip
                          v-for="symptom in possibleSymptoms"
                          :key="symptom.symptom"
                          filter
                          :append-icon="symptom.icon"
                        >
                          {{ symptom.symptom }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-window-item>
                  <v-window-item style="height: 500px">
                    <v-card-text>
                      <h2 class="text-h6 mb-2">Were any retractions observed?</h2>
                    </v-card-text>
                    <v-checkbox v-model="retractions" label="Rib area" value="rib"></v-checkbox>
                    <v-checkbox
                      v-model="retractions"
                      label="Above the collarbone"
                      value="collarbone"
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
import { useSymptomsStore } from '@/stores/symptoms'
import { useObservationsStore } from '@/stores/observations'

const emit = defineEmits<{
  submit: []
}>()

const symptomsStore = useSymptomsStore()
const observationsStore = useObservationsStore()

const possibleSymptoms = computed(() => symptomsStore.symptoms)

const window = ref(0)
const observedSymptomIndexes = ref([])

const observedSymptoms = computed(() => {
  return observedSymptomIndexes.value.map((index) => ({ index, ...possibleSymptoms.value[index] }))
})

const showFever = computed(() =>
  observedSymptoms.value.some((symptom) => symptom.symptom === 'Fever')
)

const retractions = ref([])

const temperature = ref()

function submit() {
  const observation: string[] = [
    ...observedSymptoms.value.map((symptom) => symptom.symptom),
    ...retractions.value.map((retraction) => `${retraction} retraction`)
  ]

  const feverIndex = observation.findIndex((observation) => observation === 'Fever')
  if (feverIndex > -1 && temperature.value) {
    observation[feverIndex] = `${temperature.value} °F fever`
  }

  observationsStore.addObservation(observation)
  emit('submit')
}
</script>
<style scoped></style>
