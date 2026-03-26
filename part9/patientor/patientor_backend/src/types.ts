import { z } from "zod";
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}
export const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});
export type Diagnosis = z.infer<typeof diagnosisSchema>;
const baseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});
export const entrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);
export const newEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema.omit({id: true}),
  occupationalHealthcareEntrySchema.omit({id: true}),
  hospitalEntrySchema.omit({id: true}),
]);;

export type Entry = z.infer<typeof entrySchema>;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;
export const patientSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1),
  ssn: z.string().trim().min(1),
  occupation: z.string().trim().min(1),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string(),
  entries: z.array(entrySchema).default([]),
});
export type Patient = z.infer<typeof patientSchema>;
export const newPatientSchema = patientSchema.omit({
  id: true,
});
export type NewPatient = z.infer<typeof newPatientSchema>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NonSensitiveDiagnosis = Omit<Diagnosis, "latin">;