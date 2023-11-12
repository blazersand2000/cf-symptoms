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
                                 <h2 class="text-h6 mb-2">
                                    Choose all respiratory symptoms observed today
                                 </h2>
                                 <v-chip-group v-model="observedRespiratoryKeys" column multiple>
                                    <v-chip
                                       v-for="[key, value] in possibleRespiratory"
                                       :key="key"
                                       :value="key"
                                       filter
                                       :append-icon="value.icon"
                                    >
                                       {{ value.displayName }}
                                    </v-chip>
                                 </v-chip-group>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px">
                              <v-card-text>
                                 <h2 class="text-h6 mb-2">
                                    Choose all pancreatic symptoms observed today
                                 </h2>
                                 <v-chip-group v-model="observedPancreaticKeys" column multiple>
                                    <v-chip
                                       v-for="[key, value] in possiblePancreatic"
                                       :key="key"
                                       :value="key"
                                       filter
                                       :append-icon="value.icon"
                                    >
                                       {{ value.displayName }}
                                    </v-chip>
                                 </v-chip-group>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px" v-if="showCough">
                              <v-card-text>
                                 <h2 class="text-h6 mb-2">What type of cough was observed?</h2>
                                 <v-radio-group v-model="cough">
                                    <v-radio
                                       v-for="value in possibleCough"
                                       :key="value"
                                       :label="value"
                                       :value="value"
                                    ></v-radio>
                                 </v-radio-group>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px" v-if="showAbnormalStool">
                              <v-card-text>
                                 <h2 class="text-h6 mb-2">
                                    What type of abnormal stool was observed?
                                 </h2>
                                 <v-radio-group v-model="abnormalStool">
                                    <v-radio
                                       v-for="value in possibleStool"
                                       :key="value"
                                       :label="value"
                                       :value="value"
                                    ></v-radio>
                                 </v-radio-group>
                              </v-card-text>
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
import { useObservations } from "@/composables/observations"
import type { AbnormalStoolTypes, CoughTypes, Items, Observation } from "@/types/types"
import { ref, computed } from "vue"

const emit = defineEmits<{
   submit: []
}>()

const { observationInfo, addObservation } = useObservations()

const possibleRespiratory = computed(() =>
   Object.entries(observationInfo.value).filter((entry) => entry[1].type === "respiratory")
)
const possiblePancreatic = computed(() =>
   Object.entries(observationInfo.value).filter((entry) => entry[1].type === "pancreatic")
)

const window = ref(0)

const observedRespiratoryKeys = ref<(keyof Items)[]>([])
const observedPancreaticKeys = ref<(keyof Items)[]>([])

const observation = computed<Observation>(() => {
   const obs: Observation = {
      items: {},
   }
   const observedKeys = observedRespiratoryKeys.value.concat(observedPancreaticKeys.value)
   observedKeys.forEach((key) => {
      if (key === "cough") {
         obs.items[key] = { type: cough.value ?? "dry" }
      } else if (key === "abnormalStool") {
         obs.items[key] = { type: abnormalStool.value ?? "hard" }
      } else {
         obs.items[key] = {}
      }
   })
   return obs
})

const showCough = computed(() => !!observation.value.items.cough)
const showAbnormalStool = computed(() => !!observation.value.items.abnormalStool)

const possibleCough = computed<CoughTypes[]>(() => ["dry", "productive"])
const cough = ref<CoughTypes>()
const possibleStool = computed<AbnormalStoolTypes[]>(() => ["greasy", "hard", "diarrhea"])
const abnormalStool = ref<AbnormalStoolTypes>()

function submit() {
   addObservation(observation.value)
   emit("submit")
}
</script>
<style scoped></style>
