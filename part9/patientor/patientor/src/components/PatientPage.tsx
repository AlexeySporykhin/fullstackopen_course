import { useEffect, useState } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { List, ListItem, Paper, Typography, Button } from "@mui/material";
import {
  Patient,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
  NewEntry,
} from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { Diagnosis } from "../types";
import AddEntryModal from "./AddEntryModal";
import axios from "axios";

const PatientPage = (props: { patientId: string }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(props.patientId);
      setPatient(patient);
    };
    fetchPatient();
  }, [props.patientId]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
      <div>
        <p>
          {entry.date}{" "}
          <MedicalServicesIcon fontSize="small" sx={{ color: "black" }} />{" "}
        </p>
        <p>{entry.description}</p>
        {entry.healthCheckRating === HealthCheckRating.Healthy ? (
          <FavoriteIcon fontSize="small" sx={{ color: "green" }} />
        ) : entry.healthCheckRating === HealthCheckRating.LowRisk ? (
          <FavoriteIcon fontSize="small" sx={{ color: "yellow" }} />
        ) : entry.healthCheckRating === HealthCheckRating.HighRisk ? (
          <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
        ) : entry.healthCheckRating === HealthCheckRating.CriticalRisk ? (
          <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
        ) : null}
        <p>diagnose by {entry.specialist}</p>
        <p>{entry.diagnosisCodes?.join(", ")}</p>
      </div>
    );
  };

  const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
    return (
      <div>
        <p>{entry.date}</p>
        <p>{entry.description}</p>
        <p>diagnose by {entry.specialist}</p>
        <p>{entry.diagnosisCodes?.join(", ")}</p>
      </div>
    );
  };

  const OccupationalHealthcareEntry = ({
    entry,
  }: {
    entry: OccupationalHealthcareEntry;
  }) => {
    return (
      <div>
        <p>
          {entry.date} <WorkIcon fontSize="small" sx={{ color: "black" }} />{" "}
          {entry.employerName}
        </p>
        <p>{entry.description}</p>
        <p>diagnose by {entry.specialist}</p>
        <p>{entry.diagnosisCodes?.join(", ")}</p>
      </div>
    );
  };

  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const newEntry = await patientService.addEntry(props.patientId, values);
      setPatient({ ...patient, entries: [...patient.entries, newEntry] });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;
        if (data && typeof data === "string") {
          setError(data);
        } else if (
          data &&
          typeof data === "object" &&
          "error" in data &&
          Array.isArray(data.error)
        ) {
          const issues = (data as { error: Array<{ path?: (string | number)[]; message?: string }> }).error;
          const message = issues
            .map((i) => `${i.path?.join(".") ?? "field"}: ${i.message ?? "invalid value"}`)
            .join("; ");
          setError(message);
        } else {
          console.error("Request failed: ", e.response?.data);
          setError("Request failed");
        }
      }
      else {
        console.error("Unknown error", e);
        setError("Error adding entry");
      }
    }
  };
  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : null}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        entries
      </Typography>

      <List disablePadding>
        {patient.entries.map(entry => (
          <ListItem key={entry.id} disableGutters sx={{ mb: 1.5 }}>
            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                p: 1.5,
                borderColor: "grey.500",
              }}
            >
              {EntryDetails(entry)}

              {!!entry.diagnosisCodes?.length && (
                <List dense sx={{ mt: 0.5, py: 0 }}>
                  {entry.diagnosisCodes.map(code => (
                    <ListItem key={code} sx={{ py: 0, px: 0 }}>
                      <Typography variant="body2">
                        {code} - {diagnoses.find(d => d.code === code)?.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </ListItem>
        ))}
      </List>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
