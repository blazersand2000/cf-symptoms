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
                           <!-- <v-window-item style="height: 500px">
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
                           </v-window-item> -->
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
                                    v-for="[key, value] in possibleMedications"
                                    :key="key"
                                    :label="value.displayName"
                                    :value="key"
                                    v-model="takenMedicationKeys"
                                 ></v-checkbox>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px" v-if="showTrikafta">
                              <v-card-text class="pa-0">
                                 <h2 class="text-h6 mb-2">
                                    Choose all times Trikafta was taken today
                                 </h2>
                                 <v-checkbox
                                    v-for="time in possibleMedicationTimes"
                                    :key="time"
                                    :label="time"
                                    :value="time"
                                    v-model="trikaftaTimes"
                                 ></v-checkbox>
                              </v-card-text>
                           </v-window-item>
                           <v-window-item style="height: 500px">
                              <v-card-text class="pa-0">
                                 <h2 class="text-h6 mb-2">Indicate enzymes taken today</h2>
                                 <div>
                                    <div v-for="(value, meal) in enzymes" :key="meal">
                                       <div v-if="meal !== 'Snack'">
                                          <v-checkbox
                                             v-model="value.withEnzymes"
                                             @change="
                                                value.withoutEnzymes = value.withEnzymes ? 0 : 1
                                             "
                                             :label="meal"
                                             :true-value="1"
                                             :false-value="0"
                                          ></v-checkbox>
                                       </div>
                                       <div v-else>
                                          <v-text-field
                                             v-model.number="value.withEnzymes"
                                             type="number"
                                             :rules="numberRules"
                                          >
                                             <template v-slot:label>
                                                <div>
                                                   {{ meal }} - number eaten
                                                   <strong>with</strong> enzymes
                                                </div>
                                             </template>
                                          </v-text-field>
                                          <v-text-field
                                             v-model.number="value.withoutEnzymes"
                                             type="number"
                                             :rules="numberRules"
                                          >
                                             <template v-slot:label>
                                                <div>
                                                   {{ meal }} - number eaten
                                                   <strong>without</strong> enzymes
                                                </div>
                                             </template></v-text-field
                                          >
                                       </div>
                                    </div>
                                 </div>
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
      <!-- Uncomment below to debug the observation value -->
      <!-- <v-card>
         <pre>{{ prettyJson }}</pre>
      </v-card> -->
   </v-container>
</template>
<script setup lang="ts">
import { useObservations } from "@/composables/observations"
import {
   medicationTimes,
   type AbnormalStoolTypes,
   type CoughTypes,
   type Items,
   type Observation,
   type Enzymes,
} from "@/types/types"
import { ref, computed } from "vue"

const emit = defineEmits<{
   submit: []
}>()

const { observationInfo, addObservation } = useObservations()

const possibleRespiratory = computed(() =>
   Object.entries(observationInfo.value).filter((entry) => entry[1].category === "respiratory")
)
const possiblePancreatic = computed(() =>
   Object.entries(observationInfo.value).filter((entry) => entry[1].category === "pancreatic")
)
const possibleMedications = computed(() =>
   Object.entries(observationInfo.value).filter((entry) => entry[1].category === "medication")
)

const window = ref(0)

const observedRespiratoryKeys = ref<(keyof Items)[]>([])
const observedPancreaticKeys = ref<(keyof Items)[]>([])
const takenMedicationKeys = ref<(keyof Items)[]>([])
const takenEnzymeKeys: (keyof Items)[] = ["enzymes"]

const observation = computed<Observation>(() => {
   const obs: Observation = {
      items: {},
   }
   const observedKeys = observedRespiratoryKeys.value
      .concat(observedPancreaticKeys.value)
      .concat(takenMedicationKeys.value)
      .concat(takenEnzymeKeys)
   observedKeys.forEach((key) => {
      if (key === "cough") {
         obs.items[key] = { type: cough.value ?? "dry" }
      } else if (key === "abnormalStool") {
         obs.items[key] = { type: abnormalStool.value ?? "hard" }
      } else if (key === "trikafta") {
         obs.items[key] = { timesTaken: trikaftaTimes.value }
      } else if (key === "enzymes") {
         const tookEnzymes = (enzymes: Enzymes) =>
            enzymes.Breakfast.withEnzymes > 0 ||
            enzymes.Lunch.withEnzymes > 0 ||
            enzymes.Dinner.withEnzymes > 0 ||
            enzymes.Snack.withEnzymes > 0 ||
            enzymes.Snack.withoutEnzymes > 0

         if (tookEnzymes(enzymes.value)) {
            obs.items[key] = {
               Breakfast: {
                  withEnzymes: enzymes.value.Breakfast.withEnzymes ?? 0,
                  withoutEnzymes: enzymes.value.Breakfast.withoutEnzymes ?? 0,
               },
               Lunch: {
                  withEnzymes: enzymes.value.Lunch.withEnzymes ?? 0,
                  withoutEnzymes: enzymes.value.Lunch.withoutEnzymes ?? 0,
               },
               Dinner: {
                  withEnzymes: enzymes.value.Dinner.withEnzymes ?? 0,
                  withoutEnzymes: enzymes.value.Dinner.withoutEnzymes ?? 0,
               },
               Snack: {
                  withEnzymes: enzymes.value.Snack.withEnzymes ?? 0,
                  withoutEnzymes: enzymes.value.Snack.withoutEnzymes ?? 0,
               },
            }
         }
      } else {
         obs.items[key] = {}
      }
   })
   return obs
})

const showCough = computed(() => !!observation.value.items.cough)
const showAbnormalStool = computed(() => !!observation.value.items.abnormalStool)
const showTrikafta = computed(() => !!observation.value.items.trikafta)

const possibleCough = computed<CoughTypes[]>(() => ["dry", "productive"])
const cough = ref<CoughTypes>()
const possibleStool = computed<AbnormalStoolTypes[]>(() => ["greasy", "hard", "diarrhea"])
const abnormalStool = ref<AbnormalStoolTypes>()
const possibleMedicationTimes = computed(() => medicationTimes)
const trikaftaTimes = ref<(typeof medicationTimes)[number][]>([])

const enzymes = ref<Enzymes>({
   Breakfast: { withEnzymes: 0, withoutEnzymes: 1 },
   Lunch: { withEnzymes: 0, withoutEnzymes: 1 },
   Dinner: { withEnzymes: 0, withoutEnzymes: 1 },
   Snack: { withEnzymes: 0, withoutEnzymes: 0 },
})

const numberRules = computed(() => [
   (value: number) => value >= 0 || "Number must be non-negative",
   (value: number) => Number.isInteger(value) || "Number must be an integer",
])

const prettyJson = computed(() => JSON.stringify(observation.value, null, 2))

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
