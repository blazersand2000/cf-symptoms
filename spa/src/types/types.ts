export interface Symptom {
  name: string // Name of the symptom (e.g., "Cough")
  //description: string; // Description of the symptom
  severity: 'mild' | 'moderate' | 'severe' // Severity level
  // Add other properties specific to a symptom if needed
}

// export interface Observation {
//   observations: string[]
//   timestamp: Date
// }

// export interface ObservationInstance {
//   measurements: {
//     collarBoneRetraction: ObservationItem
//     chestRetraction: ObservationItem
//   }
//   symptoms: {
//     cough: ObservationItem
//     fever: FeverObservation
//   }
// }

// export interface ObservationInfo {
//   measurements: {
//     collarBoneRetraction: ObservationItem
//     chestRetraction: ObservationItem
//   }
//   symptoms: {
//     cough: ObservationItem
//     fever: FeverObservation
//   }
// }

// export interface ObservationInfoItem {
//   displayName: string
//   icon: string
// }

export interface ObservationInfo extends Observation<ObservationInfoItem> {}

export interface ConcreteObservation extends Observation<ConcreteObservationItem> {}

export interface NewConcreteObservation extends ConcreteObservation {}

export interface SavedConcreteObservation extends ConcreteObservation, TimestampedObservation {}

interface TimestampedObservation {
   timestamp: Date
}

export interface DisplayedConcreteObservation extends SavedConcreteObservation {
   formattedTimestamp: string
}

export interface ConcreteObservationItem {
   observed: boolean
}

export interface Fever extends ConcreteObservationItem {
   temperature: number
}

export interface Cough extends ConcreteObservationItem {
   phlegm: boolean
}

type ObservationType = ObservationInfoItem | ConcreteObservationItem

export interface Measurements<T extends ObservationType> {
   collarBoneRetraction: T
   ribRetraction: T
}

export interface Symptoms<T extends ObservationType> {
   chestCongestion: T
   shortnessOfBreath: T
   cough: T
   wheezing: T
   fatigue: T
   fever: T extends ConcreteObservationItem ? Fever : T
}

export interface Observation<T extends ObservationType> {
   measurements: Measurements<T>
   symptoms: Symptoms<T>
 }
 
export interface ObservationInfoItem {
   displayName: string
   icon: string
}

export function defaultConcreteObservation(): NewConcreteObservation {
   const defaultObservationItem: ConcreteObservationItem = {
     observed: false,
   };
 
   const defaultObservation: NewConcreteObservation = {
     measurements: {
       collarBoneRetraction: defaultObservationItem,
       ribRetraction: defaultObservationItem,
     },
     symptoms: {
       chestCongestion: defaultObservationItem,
       shortnessOfBreath: defaultObservationItem,
       cough: defaultObservationItem,
       wheezing: defaultObservationItem,
       fatigue: defaultObservationItem,
       fever: {
         observed: false,
         temperature: 0,
       },
     },
   };
 
   return defaultObservation;
 }