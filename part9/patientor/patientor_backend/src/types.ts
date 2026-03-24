import { newPatientSchema } from "./utils";
import { z } from "zod";
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnosis = Omit<Diagnosis, "latin">;

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof newPatientSchema>;
