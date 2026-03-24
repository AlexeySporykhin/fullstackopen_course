import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientPage = (props: { patientId: string | null }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  console.log("props.patientId", props.patientId);
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(props.patientId ?? "");
      setPatient(patient);
    };
    fetchPatient();
  }, [props.patientId]);
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
    </div>
  );
};

export default PatientPage;
