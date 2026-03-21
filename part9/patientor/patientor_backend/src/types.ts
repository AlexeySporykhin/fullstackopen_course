export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
} 

export type NonSensitiveDiagnosis = Omit<Diagnosis, 'latin'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
