export interface SavedObservation extends Observation, TimeStamped {}

export interface TimeStamped {
   timestamp: Date;
}

export interface DisplayedObservation extends ObservationWithInfo, TimeStamped {
   formattedTimestamp: string;
}

export interface ObservationItem {}

export interface Fever extends ObservationItem {
   temperature: number;
}

export interface Cough extends ObservationItem {
   phlegm: boolean;
}

export interface Items<T = null> {
   collarBoneRetraction?: T extends null
      ? ObservationItem
      : ObservationItem & T;
   ribRetraction?: T extends null ? ObservationItem : ObservationItem & T;
   chestCongestion?: T extends null ? ObservationItem : ObservationItem & T;
   shortnessOfBreath?: T extends null ? ObservationItem : ObservationItem & T;
   cough?: T extends null ? ObservationItem : ObservationItem & T;
   wheezing?: T extends null ? ObservationItem : ObservationItem & T;
   fatigue?: T extends null ? ObservationItem : ObservationItem & T;
   fever?: T extends null ? Fever : Fever & T;
}

export interface Observation extends BaseObservation {}

interface ObservationWithInfo extends BaseObservation<ObservationInfoItem> {}

interface BaseObservation<T = null> {
   items: Items<T>;
}

export interface ObservationInfoItem {
   displayName: string;
   type: ObservationType;
   icon: string;
}

export type ObservationInfo = Record<keyof Items, ObservationInfoItem>;

type ObservationType = "measurement" | "symptom";

// export function defaultConcreteObservation(): NewObservation {
//    const defaultObservationItem: ObservationItem = {
//      observed: false,
//    };

//    const defaultObservation: NewObservation = {
//      measurements: {
//        collarBoneRetraction: defaultObservationItem,
//        ribRetraction: defaultObservationItem,
//      },
//      symptoms: {
//        chestCongestion: defaultObservationItem,
//        shortnessOfBreath: defaultObservationItem,
//        cough: defaultObservationItem,
//        wheezing: defaultObservationItem,
//        fatigue: defaultObservationItem,
//        fever: {
//          observed: false,
//          temperature: 0,
//        },
//      },
//    };

//    return defaultObservation;
//  }
