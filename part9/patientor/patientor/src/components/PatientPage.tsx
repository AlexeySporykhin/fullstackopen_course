import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientPage = (props: { patientId: string }) => {  
  const [patient, setPatient] = useState<Patient | null>(null);
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(props.patientId);
      setPatient(patient);
    };
    fetchPatient();
  }, [props.patientId]);
  if (!patient) {
    return <div>Loading...</div>;
  }
  console.log('patient', patient);
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
                  <li key={code}> {code}</li>
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
