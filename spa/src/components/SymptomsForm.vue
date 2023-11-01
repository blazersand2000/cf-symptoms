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
  <v-container style="max-width: 800px; height: 400px;">
    <v-row>
      <v-col>
        <!-- <v-card class="mx-auto mt-4" max-width="400"> -->
        <v-card>
          <v-window v-model="window" show-arrows>
            <v-container>
              <v-row>
                <v-col cols="2"> </v-col>
                <v-col cols="8">
                  <v-window-item style="height: 500px;">
                    <v-card-text>
                      <h2 class="text-h6 mb-2">Choose all symptoms observed today</h2>

                      <v-chip-group v-model="observations" column multiple>
                        <v-chip
                          v-for="symptom in symptoms"
                          :key="symptom.symptom"
                          filter
                          :append-icon="symptom.icon"
                        >
                          {{ symptom.symptom }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-window-item>
                  <v-window-item v-for="window in windows" :key="window.index" style="height: 500px;">
                    <span class="text-h2">{{ window.symptom }}</span>
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

const symptoms: { symptom: string; icon: string }[] = [
  { symptom: 'Chest Congestion', icon: 'mdi-liquid-spot' },
  { symptom: 'Shortness of Breath', icon: 'mdi-lungs' },
  { symptom: 'Coughing', icon: 'mdi-account-voice' },
  { symptom: 'Wheezing', icon: 'mdi-weather-dust' },
  { symptom: 'Fatigue', icon: 'mdi-eye-closed' },
  { symptom: 'Fever', icon: 'mdi-emoticon-sick' }
]

const window = ref(0)
const observations = ref([2])

const windows = computed(() => {
  return observations.value.map((index) => ({ index, ...symptoms[index] }))
})

function click() {
  console.log('sup')
}
</script>
<style scoped></style>
