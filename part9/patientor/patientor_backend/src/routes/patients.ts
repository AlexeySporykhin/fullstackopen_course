import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import patientsService from "../services/patientsService";
import {
  Patient,
  NewPatient,
  newPatientSchema,
  Entry,
  NewEntry,
  newEntrySchema,
} from "../types";
import { parseDiagnosisCodes } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  res.send(patientsService.getPatientById(req.params.id));
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.post(
  "/:id/entries",
  (
    req: Request<{id: string}, Entry, NewEntry>,
    res: Response<Entry>,
    next: NextFunction,
  ) => {
    try {
      const parsedBody = newEntrySchema.parse(req.body);
      const diagnosisCodes = parseDiagnosisCodes(parsedBody);
      const addedEntry = patientsService.addEntry(req.params.id, {
        ...parsedBody,
        diagnosisCodes,
      });
      res.json(addedEntry);
    } catch (error) {
      next(error);
    }
  },
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
