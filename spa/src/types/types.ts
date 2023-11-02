export interface Symptom {
   name: string; // Name of the symptom (e.g., "Cough")
   //description: string; // Description of the symptom
   severity: 'mild' | 'moderate' | 'severe'; // Severity level
   // Add other properties specific to a symptom if needed
 }

 export interface Observation {
   observations: string[],
   timestamp: Date
 }