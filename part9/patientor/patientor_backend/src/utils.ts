/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const newPatientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  dateOfBirth: z.string().date(),
  ssn: z.string().trim().min(1, "SSN is required"),
  gender: z.enum(Gender),
  occupation: z.string().trim().min(1, "Occupation is required"),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

const info = (...params: string[]) => {
  console.log(...params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestLogger = (request: any, _response: any, next: any) => {
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("---");
  next();
};

export default toNewPatient;
