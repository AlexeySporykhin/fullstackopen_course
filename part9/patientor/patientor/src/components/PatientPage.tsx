import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import diagnosesService from "../services/diagnoses";
import { Diagnosis } from "../types";

const PatientPage = (props: { patientId: string }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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
      <h3>entries</h3>
      <ul>
        {patient.entries.map(entry => {
          return (
            <li key={entry.id}>
              {entry.date} - {entry.description}
              <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>
                    {" "}
                    {code} -{" "}
                    {diagnoses.find(diagnosis => diagnosis.code === code)?.name}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientPage;
