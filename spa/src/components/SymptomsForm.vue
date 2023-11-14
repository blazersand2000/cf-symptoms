<template>
   <v-container class="pa-0" style="max-width: 800px; height: 400px">
      <v-row>
         <v-col>
            <v-card>
               <v-window v-model="window" show-arrows>
                  <template v-slot:prev="{ props }">
                     <v-btn
                        density="comfortable"
                        icon="mdi-menu-left"
                        @click="props.onClick"
                     ></v-btn>
                  </template>
                  <template v-slot:next="{ props }">
                     <v-btn
                        density="comfortable"
                        icon="mdi-menu-right"
                        @click="props.onClick"
                     ></v-btn>
                  </template>
                  <v-container>
                     <v-row>
                        <v-col cols="2"> </v-col>
                        <v-col cols="8" class="pa-0">
                           <v-window-item style="height: 500px">
                              <v-card-text class="pa-0">
                                 <h2 class="text-h6 mb-2">Snack</h2>
                                 <v-row>
                                    <v-btn class="mb-5" color="primary" @click="addSnack"
                                       >Add Snack</v-btn
                                    >
                                 </v-row>
                                 <div style="overflow-y: auto; max-height: 500px">
                                    <div v-for="(image, index) in images" :key="index">
                                       <v-img
                                          class="ma-2 border rounded"
                                          :src="image"
                                          alt="snackity snack snack"
                                          width="40%"
                                       />
                                    </div>
                                 </div>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px">
                              <v-card-text class="pa-0">
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
                              <v-card-text class="pa-0">
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
                              <v-card-text class="pa-0">
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
                              <v-card-text class="pa-0">
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
                              <v-card-text class="pa-0">
                                 <h2 class="text-h6 mb-2">Indicate all medications taken today</h2>
                                 <v-checkbox
                                    v-for="value in possibleMedications"
                                    :key="value"
                                    :label="value"
                                    :value="value"
                                    v-model="takenMedications"
                                 ></v-checkbox>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px">
                              <div class="d-flex align-center justify-center" style="height: 100%">
                                 <v-btn color="success" @click="submit">Submit Symptoms</v-btn>
                              </div>
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

const images = ref<string[]>([])
function addSnack() {
   images.value.push("/snack.png")
}
</script>
<style scoped></style>
