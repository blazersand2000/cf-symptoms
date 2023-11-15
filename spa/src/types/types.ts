export interface SavedObservation extends Observation, TimeStamped {}

export interface TimeStamped {
   timestamp: Date
}

export interface DisplayedObservation extends ObservationWithInfo, TimeStamped {
   formattedTimestamp: string
}

export interface ObservationItem {}

export type CoughTypes = "dry" | "productive"

export interface Cough extends ObservationItem {
   type: CoughTypes
}

export type AbnormalStoolTypes = "greasy" | "hard" | "diarrhea"

export interface AbnormalStool extends ObservationItem {
   type: AbnormalStoolTypes
}

export interface SelectableTimesOfDay extends ObservationItem {
   timesTaken: (typeof medicationTimes)[number][]
}

export const medicationTimes = ["AM", "PM"] as const

export type Enzymes = Record<
   "Breakfast" | "Lunch" | "Dinner" | "Snack",
   { withEnzymes: number; withoutEnzymes: number }
>

export interface Items<T = null> {
   collarBoneRetraction?: T extends null ? ObservationItem : ObservationItem & T
   ribRetraction?: T extends null ? ObservationItem : ObservationItem & T
   cough?: T extends null ? Cough : Cough & T
   aspiration?: T extends null ? ObservationItem : ObservationItem & T
   mouthBreathing?: T extends null ? ObservationItem : ObservationItem & T
   abnormalStool?: T extends null ? AbnormalStool : AbnormalStool & T
   constipation?: T extends null ? ObservationItem : ObservationItem & T
   diaperRash?: T extends null ? ObservationItem : ObservationItem & T
   bloating?: T extends null ? ObservationItem : ObservationItem & T
   tummyPain?: T extends null ? ObservationItem : ObservationItem & T
   trikafta?: T extends null ? SelectableTimesOfDay : SelectableTimesOfDay & T
   vitaminD?: T extends null ? ObservationItem : ObservationItem & T
   salt?: T extends null ? ObservationItem : ObservationItem & T
   dekas?: T extends null ? ObservationItem : ObservationItem & T
   enzymes?: T extends null ? Enzymes : Enzymes & T
}

export interface Observation extends BaseObservation {}

interface ObservationWithInfo extends BaseObservation<ObservationInfoItem> {}

interface BaseObservation<T = null> {
   items: Items<T>
}

export interface ObservationInfoItem {
   displayName: string
   type: ObservationType
   icon: string
}

export type ObservationInfo = Record<keyof Items, ObservationInfoItem>

type ObservationType = "respiratory" | "pancreatic" | "medication" | "other"
