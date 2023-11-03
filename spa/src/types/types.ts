import { inherits } from 'util'

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

export interface ObservationInfo extends Observation<ObservationInfo> {}

export interface ConcreteObservation extends Observation<ConcreteObservation> {}

export interface NewConcreteObservation extends ConcreteObservation {}

export interface SavedConcreteObservation extends ConcreteObservation {
   timestamp: Date
}

export interface DisplayedConcreteObservation extends SavedConcreteObservation {
   formattedTimestamp: string
}

export interface ConcreteObservationItem {}
export interface Fever extends ConcreteObservationItem {
   temperature: number
}

export interface Cough extends ConcreteObservationItem {
   phlegm: boolean
}

export interface Observation<T extends ObservationInfo | ConcreteObservation> {
   measurements: {
     collarBoneRetraction: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
     ribRetraction: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
   }
   symptoms: {
      chestCongestion: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
      shortnessOfBreath: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
      cough: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
      wheezing: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
      fatigue: T extends ObservationInfo ? ObservationInfoItem : ConcreteObservationItem
      fever: T extends ObservationInfo ? ObservationInfoItem : Fever
   }
 }
 
export interface ObservationInfoItem {
   displayName: string
   icon: string
}
